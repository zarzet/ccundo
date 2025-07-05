# ccundo

[![npm version](https://badge.fury.io/js/ccundo.svg)](https://badge.fury.io/js/ccundo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Intelligent undo for Claude Code sessions** - Revert individual operations with cascading safety and detailed previews.

ccundo seamlessly integrates with Claude Code to provide granular undo functionality. It reads directly from Claude Code's session files to track file operations and allows you to selectively revert changes with full preview and cascading safety.

## ✨ Features

- **Automatic Detection** - Reads directly from Claude Code session files
- **Detailed Previews** - See exactly what will be changed before undoing
- **Cascading Undo** - Maintains project consistency by undoing dependent operations
- **Multi-language** - Supports English and Japanese (日本語)
- **Smart Operation Tracking** - Tracks file edits, creations, deletions, renames, and bash commands
- **Safe Backups** - Creates backups before making changes
- **Zero Configuration** - Works out of the box with Claude Code

## Installation

```bash
npm install -g ccundo
```

## Quick Start

1. Navigate to a directory where you've used Claude Code
2. List recent operations:
   ```bash
   ccundo list
   ```
3. Preview what would be undone:
   ```bash
   ccundo preview
   ```
4. Undo operations with confirmation:
   ```bash
   ccundo undo
   ```

## Usage

### List Operations

View all operations from your current Claude Code session:

```bash
ccundo list                    # Show recent operations
ccundo list --all             # Include already undone operations
```

**Example output:**
```
Operations from Claude Code session:

1. [ACTIVE] file_edit - 2m ago
   ID: toolu_01XYZ...
   File: /project/src/app.js

2. [ACTIVE] file_create - 5m ago
   ID: toolu_01ABC...
   File: /project/src/utils.js

3. [ACTIVE] bash_command - 7m ago
   ID: toolu_01DEF...
   Command: npm install express
```

### Preview Changes

See exactly what will be undone without making any changes:

```bash
ccundo preview                 # Interactive selection
ccundo preview <operation-id>  # Preview specific operation
```

**Preview shows:**
- File diffs for edits (- current content, + original content)
- Content that will be restored for deleted files  
- Files that will be deleted for created files
- Bash commands that require manual intervention

### Undo Operations

Safely revert operations with detailed confirmation:

```bash
ccundo undo                    # Interactive selection with preview
ccundo undo <operation-id>     # Undo specific operation
ccundo undo --yes             # Skip confirmation prompts
```

**Cascading Undo:** When you select an operation to undo, ccundo will also undo ALL operations that came after it. This ensures your project remains in a consistent state.

### Session Management

Work with multiple Claude Code sessions:

```bash
ccundo sessions               # List all sessions across projects
ccundo session <session-id>  # Switch to specific session
```

### Language Support

ccundo supports multiple languages with persistent preferences:

```bash
ccundo language               # Show current language and options
ccundo language en           # Switch to English
ccundo language ja           # Switch to Japanese (日本語)
```

**Supported Languages:**
- 🇺🇸 English (`en`) - Default
- 🇯🇵 Japanese (`ja`) - 日本語フルサポート

## How It Works

ccundo automatically integrates with Claude Code by:

1. **Reading Session Files** - Parses `.jsonl` files in `~/.claude/projects/`
2. **Extracting Operations** - Identifies file operations and bash commands from tool usage
3. **Tracking Dependencies** - Understands operation ordering for safe cascading undo
4. **Creating Backups** - Saves current state before making changes to `~/.ccundo/backups/`
5. **Maintaining State** - Stores undo history and language preferences in `~/.ccundo/`

## Supported Operations

| Operation Type | Description | Undo Action |
|---|---|---|
| **File Create** | Files created by Claude | Delete file (with backup) |
| **File Edit** | File content modifications | Revert to original content |
| **File Delete** | Files deleted by Claude | Restore file content |
| **File Rename** | File/directory renames | Rename back to original |
| **Directory Create** | Directory creation | Remove directory |
| **Directory Delete** | Directory removal | Recreate directory |
| **Bash Command** | Shell commands | Manual intervention required |

## Examples

### Undoing Recent File Changes

```bash
$ ccundo list
Operations from Claude Code session:

1. [ACTIVE] file_edit - 30s ago
   ID: toolu_01XYZ123
   File: /project/src/app.js

$ ccundo preview
📋 Preview: Would undo 1 operation(s):

1. file_edit - 30s ago
   Will revert file: /project/src/app.js
   
   - const newFeature = true;
   + const newFeature = false;
     console.log('App started');

$ ccundo undo --yes
✓ File reverted: /project/src/app.js
  Backup saved to: ~/.ccundo/backups/toolu_01XYZ123-current

Completed: 1 successful, 0 failed
```

### Cascading Undo Example

```bash
$ ccundo preview
⚠️  Cascading undo: Selecting an operation will undo it and ALL operations that came after it.

? Select operation to preview:
❯ file_create - 1m ago (+ 2 more would be undone)
  file_edit - 2m ago (+ 1 more would be undone)  
  bash_command - 5m ago

📋 Preview: Would undo 3 operation(s):

1. file_create - 1m ago
   Will delete file: /project/new-feature.js

2. file_edit - 2m ago  
   Will revert file: /project/app.js

3. bash_command - 5m ago
   Cannot auto-undo bash command: npm install new-package
   Manual intervention required
```

## Configuration

ccundo stores its configuration in `~/.ccundo/`:

```
~/.ccundo/
├── config.json          # Language preferences
├── sessions/            # Local session tracking (if used)
└── backups/            # Operation backups
```

**Config format:**
```json
{
  "language": "en"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
git clone https://github.com/RonitSachdev/ccundo.git
cd ccundo
npm install
npm link
```

### Adding Languages

1. Add translations to `src/i18n/languages.js`
2. Update language list in documentation
3. Test with `npm run test`

## License

MIT © Ronit Sachdev