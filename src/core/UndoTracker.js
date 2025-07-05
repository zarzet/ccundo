import fs from 'fs/promises';
import path from 'path';

export class UndoTracker {
  constructor() {
    this.undoFile = path.join(process.env.HOME, '.ccundo', 'undone-operations.json');
  }

  async init() {
    await fs.mkdir(path.dirname(this.undoFile), { recursive: true });
  }

  async getUndoneOperations() {
    try {
      const data = await fs.readFile(this.undoFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return {};
      }
      throw error;
    }
  }

  async markAsUndone(operationId, sessionFile) {
    const undoneOps = await this.getUndoneOperations();
    
    if (!undoneOps[sessionFile]) {
      undoneOps[sessionFile] = [];
    }
    
    if (!undoneOps[sessionFile].includes(operationId)) {
      undoneOps[sessionFile].push(operationId);
      await fs.writeFile(this.undoFile, JSON.stringify(undoneOps, null, 2));
    }
  }

  async isUndone(operationId, sessionFile) {
    const undoneOps = await this.getUndoneOperations();
    return undoneOps[sessionFile]?.includes(operationId) || false;
  }

  async filterUndoneOperations(operations, sessionFile) {
    const undoneOps = await this.getUndoneOperations();
    const undoneIds = undoneOps[sessionFile] || [];
    
    return operations.filter(op => !undoneIds.includes(op.id));
  }
}