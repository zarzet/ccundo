import { Operation, OperationType } from '../src/core/Operation.js';

describe('Operation', () => {
  test('creates operation with unique id', () => {
    const op1 = new Operation(OperationType.FILE_CREATE, { filePath: '/test1' });
    const op2 = new Operation(OperationType.FILE_CREATE, { filePath: '/test2' });
    
    expect(op1.id).not.toBe(op2.id);
  });

  test('serializes to JSON correctly', () => {
    const op = new Operation(OperationType.FILE_EDIT, { 
      filePath: '/test.js',
      originalContent: 'old',
      newContent: 'new'
    });
    
    const json = op.toJSON();
    
    expect(json.id).toBe(op.id);
    expect(json.type).toBe(OperationType.FILE_EDIT);
    expect(json.data.filePath).toBe('/test.js');
    expect(json.undone).toBe(false);
  });

  test('deserializes from JSON correctly', () => {
    const originalOp = new Operation(OperationType.FILE_DELETE, { 
      filePath: '/deleted.txt',
      content: 'content'
    });
    originalOp.undone = true;
    
    const json = originalOp.toJSON();
    const restoredOp = Operation.fromJSON(json);
    
    expect(restoredOp.id).toBe(originalOp.id);
    expect(restoredOp.type).toBe(originalOp.type);
    expect(restoredOp.data).toEqual(originalOp.data);
    expect(restoredOp.undone).toBe(true);
  });
});