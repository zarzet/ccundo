import crypto from 'crypto';

export class Operation {
  constructor(type, data) {
    this.id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.floor(Math.random()*1e9)}`);
    this.timestamp = new Date();
    this.type = type;
    this.data = data;
    this.undone = false;
  }

  static fromJSON(json) {
    const op = new Operation(json.type, json.data);
    op.id = json.id;
    op.timestamp = new Date(json.timestamp);
    op.undone = json.undone || false;
    return op;
  }

  toJSON() {
    return {
      id: this.id,
      timestamp: this.timestamp.toISOString(),
      type: this.type,
      data: this.data,
      undone: this.undone
    };
  }
}

export const OperationType = {
  FILE_CREATE: 'file_create',
  FILE_EDIT: 'file_edit',
  FILE_DELETE: 'file_delete',
  FILE_RENAME: 'file_rename',
  DIRECTORY_CREATE: 'directory_create',
  DIRECTORY_DELETE: 'directory_delete',
  BASH_COMMAND: 'bash_command'
};