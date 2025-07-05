import fs from 'fs/promises';
import chalk from 'chalk';
import { OperationType } from './Operation.js';
import { i18n } from '../i18n/i18n.js';

export class OperationPreview {
  static async generatePreview(operation) {
    switch (operation.type) {
      case OperationType.FILE_CREATE:
        return await this.previewFileCreate(operation);
      case OperationType.FILE_EDIT:
        return await this.previewFileEdit(operation);
      case OperationType.FILE_DELETE:
        return await this.previewFileDelete(operation);
      case OperationType.FILE_RENAME:
        return await this.previewFileRename(operation);
      case OperationType.DIRECTORY_CREATE:
        return await this.previewDirectoryCreate(operation);
      case OperationType.DIRECTORY_DELETE:
        return await this.previewDirectoryDelete(operation);
      case OperationType.BASH_COMMAND:
        return await this.previewBashCommand(operation);
      default:
        return { preview: `Unknown operation: ${operation.type}`, hasContent: false };
    }
  }

  static async previewFileCreate(operation) {
    const { filePath } = operation.data;
    
    try {
      const exists = await fs.access(filePath).then(() => true).catch(() => false);
      if (!exists) {
        return {
          preview: `${chalk.red('File does not exist:')} ${filePath}`,
          hasContent: false
        };
      }

      const content = await fs.readFile(filePath, 'utf8');
      const lines = content.split('\n');
      const preview = lines.slice(0, 5).join('\n');
      const truncated = lines.length > 5;
      
      return {
        preview: `${chalk.red(i18n.t('action.will_delete_file'))} ${filePath}\n${chalk.gray(i18n.t('status.current_content'))}\n${preview}${truncated ? '\n...' : ''}`,
        hasContent: true,
        action: 'delete'
      };
    } catch (error) {
      return {
        preview: `${chalk.red('Error reading file:')} ${filePath} - ${error.message}`,
        hasContent: false
      };
    }
  }

  static async previewFileEdit(operation) {
    const { filePath, originalContent, oldString, newString, replaceAll, edits, isMultiEdit } = operation.data;
    
    try {
      const currentContent = await fs.readFile(filePath, 'utf8');
      let preview = `${chalk.yellow(i18n.t('action.will_revert_file'))} ${filePath}\n\n`;
      
      if (originalContent) {
        // Legacy mode - show full diff
        const originalLines = originalContent.split('\n');
        const currentLines = currentContent.split('\n');
        
        const maxLines = Math.max(originalLines.length, currentLines.length);
        const previewLines = Math.min(maxLines, 10);
        
        for (let i = 0; i < previewLines; i++) {
          const orig = originalLines[i] || '';
          const curr = currentLines[i] || '';
          
          if (orig !== curr) {
            if (curr) {
              preview += `${chalk.red('-')} ${curr}\n`;
            }
            if (orig) {
              preview += `${chalk.green('+')} ${orig}\n`;
            }
          } else if (orig) {
            preview += `  ${orig}\n`;
          }
        }
        
        if (maxLines > 10) {
          preview += chalk.gray(`... (${maxLines - 10} more lines)`);
        }
      } else if (isMultiEdit && edits) {
        // Show what MultiEdit changes will be reversed
        preview += chalk.gray('String replacements to be reversed:\n');
        edits.forEach((edit, index) => {
          if (edit.new_string && edit.old_string !== undefined) {
            preview += `${index + 1}. "${chalk.red(edit.new_string)}" → "${chalk.green(edit.old_string)}"\n`;
          }
        });
      } else if (oldString !== undefined && newString) {
        // Show what single edit will be reversed
        preview += chalk.gray('String replacement to be reversed:\n');
        preview += `"${chalk.red(newString)}" → "${chalk.green(oldString)}"`;
        if (replaceAll) {
          preview += chalk.gray(' (all occurrences)');
        }
        preview += '\n\n';
        
        // Show context where the change will happen
        const lines = currentContent.split('\n');
        let foundLine = -1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(newString)) {
            foundLine = i;
            break;
          }
        }
        
        if (foundLine >= 0) {
          preview += chalk.gray('Context:\n');
          const start = Math.max(0, foundLine - 2);
          const end = Math.min(lines.length, foundLine + 3);
          for (let i = start; i < end; i++) {
            if (i === foundLine) {
              preview += chalk.yellow('> ');
            } else {
              preview += '  ';
            }
            preview += lines[i] + '\n';
          }
        }
      } else {
        preview += chalk.gray(i18n.t('status.original_not_available'));
      }
      
      return {
        preview,
        hasContent: true,
        action: 'revert'
      };
    } catch (error) {
      return {
        preview: `${chalk.yellow(i18n.t('action.will_revert_file'))} ${filePath}\n${chalk.red('Error:')} ${error.message}`,
        hasContent: false
      };
    }
  }

  static async previewFileDelete(operation) {
    const { filePath, content } = operation.data;
    
    if (!content) {
      return {
        preview: `${chalk.green(i18n.t('action.will_restore_file'))} ${filePath}\n${chalk.gray(i18n.t('status.content_not_available'))}`,
        hasContent: false
      };
    }

    const lines = content.split('\n');
    const preview = lines.slice(0, 5).join('\n');
    const truncated = lines.length > 5;
    
    return {
      preview: `${chalk.green(i18n.t('action.will_restore_file'))} ${filePath}\n${chalk.gray(i18n.t('status.content_to_restore'))}\n${preview}${truncated ? '\n...' : ''}`,
      hasContent: true,
      action: 'restore'
    };
  }

  static async previewFileRename(operation) {
    const { oldPath, newPath } = operation.data;
    
    return {
      preview: `${chalk.yellow(i18n.t('action.will_rename_back'))} ${newPath} → ${oldPath}`,
      hasContent: false,
      action: 'rename'
    };
  }

  static async previewDirectoryCreate(operation) {
    const { dirPath } = operation.data;
    
    try {
      const exists = await fs.access(dirPath).then(() => true).catch(() => false);
      const status = exists ? chalk.red('Will remove directory:') : chalk.gray('Directory already removed:');
      
      return {
        preview: `${status} ${dirPath}`,
        hasContent: false,
        action: exists ? 'remove' : 'none'
      };
    } catch (error) {
      return {
        preview: `${chalk.yellow('Will remove directory:')} ${dirPath}`,
        hasContent: false,
        action: 'remove'
      };
    }
  }

  static async previewDirectoryDelete(operation) {
    const { dirPath } = operation.data;
    
    return {
      preview: `${chalk.green('Will restore directory:')} ${dirPath}`,
      hasContent: false,
      action: 'restore'
    };
  }

  static async previewBashCommand(operation) {
    const { command } = operation.data;
    
    return {
      preview: `${chalk.red(i18n.t('action.cannot_undo_bash'))} ${command}\n${chalk.gray(i18n.t('action.manual_intervention'))}`,
      hasContent: false,
      action: 'manual'
    };
  }
}