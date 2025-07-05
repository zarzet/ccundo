import fs from 'fs/promises';
import path from 'path';
import { OperationType } from './Operation.js';

export class UndoManager {
  constructor() {
    this.backupDir = path.join(process.env.HOME, '.ccundo', 'backups');
  }

  async init() {
    await fs.mkdir(this.backupDir, { recursive: true });
  }

  async undo(operation) {
    switch (operation.type) {
      case OperationType.FILE_CREATE:
        return await this.undoFileCreate(operation);
      case OperationType.FILE_EDIT:
        return await this.undoFileEdit(operation);
      case OperationType.FILE_DELETE:
        return await this.undoFileDelete(operation);
      case OperationType.FILE_RENAME:
        return await this.undoFileRename(operation);
      case OperationType.DIRECTORY_CREATE:
        return await this.undoDirectoryCreate(operation);
      case OperationType.DIRECTORY_DELETE:
        return await this.undoDirectoryDelete(operation);
      case OperationType.BASH_COMMAND:
        return await this.undoBashCommand(operation);
      default:
        throw new Error(`Unknown operation type: ${operation.type}`);
    }
  }

  async undoFileCreate(operation) {
    const { filePath } = operation.data;
    const backupPath = path.join(this.backupDir, `${operation.id}-deleted`);
    
    try {
      const content = await fs.readFile(filePath, 'utf8');
      await fs.writeFile(backupPath, content);
      await fs.unlink(filePath);
      
      return {
        success: true,
        message: `File deleted: ${filePath}`,
        backupPath
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to undo file creation: ${error.message}`
      };
    }
  }

  async undoFileEdit(operation) {
    const { filePath, originalContent } = operation.data;
    
    if (!originalContent) {
      return {
        success: false,
        message: `Cannot undo file edit: original content not available for ${filePath}`
      };
    }
    
    try {
      const currentContent = await fs.readFile(filePath, 'utf8');
      const backupPath = path.join(this.backupDir, `${operation.id}-current`);
      await fs.writeFile(backupPath, currentContent);
      
      await fs.writeFile(filePath, originalContent);
      
      return {
        success: true,
        message: `File reverted: ${filePath}`,
        backupPath
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to undo file edit: ${error.message}`
      };
    }
  }

  async undoFileDelete(operation) {
    const { filePath, content } = operation.data;
    
    try {
      await fs.writeFile(filePath, content);
      
      return {
        success: true,
        message: `File restored: ${filePath}`
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to restore file: ${error.message}`
      };
    }
  }

  async undoFileRename(operation) {
    const { oldPath, newPath } = operation.data;
    
    try {
      await fs.rename(newPath, oldPath);
      
      return {
        success: true,
        message: `File renamed back: ${newPath} -> ${oldPath}`
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to undo rename: ${error.message}`
      };
    }
  }

  async undoDirectoryCreate(operation) {
    const { dirPath } = operation.data;
    
    try {
      await fs.rmdir(dirPath);
      
      return {
        success: true,
        message: `Directory removed: ${dirPath}`
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to remove directory: ${error.message}`
      };
    }
  }

  async undoDirectoryDelete(operation) {
    const { dirPath } = operation.data;
    
    try {
      await fs.mkdir(dirPath, { recursive: true });
      
      return {
        success: true,
        message: `Directory restored: ${dirPath}`
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to restore directory: ${error.message}`
      };
    }
  }

  async undoBashCommand(operation) {
    return {
      success: false,
      message: `Cannot automatically undo bash command: ${operation.data.command}\nPlease manually revert any changes.`
    };
  }
}