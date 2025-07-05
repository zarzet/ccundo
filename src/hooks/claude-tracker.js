#!/usr/bin/env node

import fs from 'fs/promises';
import { SessionTracker } from '../core/SessionTracker.js';
import { Operation, OperationType } from '../core/Operation.js';

async function trackOperation() {
  try {
    const input = JSON.parse(process.argv[2] || '{}');
    
    let sessionId = await SessionTracker.getCurrentSession();
    if (!sessionId) {
      sessionId = new Date().toISOString().replace(/[:.]/g, '-');
      await SessionTracker.setCurrentSession(sessionId);
    }
    
    const tracker = new SessionTracker(sessionId);
    await tracker.init();
    
    let operation = null;
    
    if (input.tool === 'Write' && input.parameters?.file_path) {
      operation = new Operation(OperationType.FILE_CREATE, {
        filePath: input.parameters.file_path,
        content: input.parameters.content || ''
      });
    } else if (input.tool === 'Edit' && input.parameters?.file_path) {
      let originalContent = '';
      try {
        originalContent = await fs.readFile(input.parameters.file_path, 'utf8');
      } catch (e) {}
      
      operation = new Operation(OperationType.FILE_EDIT, {
        filePath: input.parameters.file_path,
        originalContent,
        newContent: input.parameters.new_string || ''
      });
    } else if (input.tool === 'Bash' && input.parameters?.command) {
      const command = input.parameters.command;
      
      if (command.includes('rm ') && command.includes('-f')) {
        const match = command.match(/rm\s+.*?\s+([^\s]+)$/);
        if (match) {
          const filePath = match[1];
          let content = '';
          try {
            content = await fs.readFile(filePath, 'utf8');
          } catch (e) {}
          
          operation = new Operation(OperationType.FILE_DELETE, {
            filePath,
            content
          });
        }
      } else if (command.includes('mv ')) {
        const match = command.match(/mv\s+([^\s]+)\s+([^\s]+)$/);
        if (match) {
          operation = new Operation(OperationType.FILE_RENAME, {
            oldPath: match[1],
            newPath: match[2]
          });
        }
      } else if (command.includes('mkdir')) {
        const match = command.match(/mkdir\s+.*?\s+([^\s]+)$/);
        if (match) {
          operation = new Operation(OperationType.DIRECTORY_CREATE, {
            dirPath: match[1]
          });
        }
      } else if (command.includes('rmdir') || (command.includes('rm') && command.includes('-r'))) {
        const match = command.match(/rm(?:dir)?\s+.*?\s+([^\s]+)$/);
        if (match) {
          operation = new Operation(OperationType.DIRECTORY_DELETE, {
            dirPath: match[1]
          });
        }
      } else {
        operation = new Operation(OperationType.BASH_COMMAND, {
          command
        });
      }
    }
    
    if (operation) {
      await tracker.addOperation(operation);
    }
  } catch (error) {
    console.error('Failed to track operation:', error.message);
  }
}

trackOperation();