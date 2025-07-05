# Changelog

All notable changes to ccundo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-05

### Added
- **Core Functionality**
  - Direct integration with Claude Code session files
  - Automatic operation tracking from `.jsonl` session files
  - Cascading undo system for maintaining project consistency
  - Detailed operation previews before undoing
  - Safe backup system for all undo operations

- **Supported Operations**
  - File creation/deletion with content preservation
  - File editing with diff previews
  - File and directory renaming
  - Directory creation/removal
  - Bash command tracking (manual intervention required)

- **User Interface**
  - Interactive operation selection with cascading indicators
  - Detailed preview system showing exact changes
  - Color-coded status and action indicators
  - Confirmation prompts with operation summaries

- **Session Management**
  - Multi-session support across different projects
  - Session switching and listing functionality
  - Automatic current session detection

- **Internationalization**
  - Full English language support
  - Complete Japanese (日本語) localization
  - Persistent language preferences
  - Localized time formatting and error messages

- **CLI Commands**
  - `ccundo list` - View operations from current session
  - `ccundo preview` - Preview changes without executing
  - `ccundo undo` - Interactive undo with cascading safety
  - `ccundo sessions` - Manage multiple sessions
  - `ccundo language` - Switch interface language

- **Safety Features**
  - Automatic backups before any changes
  - Cascading undo prevents inconsistent states
  - Preview system prevents accidental changes
  - Operation validation and error handling

### Technical Details
- Node.js 16+ support with ES modules
- Zero-configuration setup
- File system integration with Claude Code's storage format
- Robust JSON Lines parser for session files
- Modular architecture for easy extension

### Dependencies
- commander ^11.1.0 - CLI framework
- chalk ^5.3.0 - Terminal styling
- inquirer ^9.2.12 - Interactive prompts

## [1.0.1] - 2025-07-05

### Fixed
- **Critical Bug Fix**: Operations that have been undone are now properly tracked and filtered out from subsequent undo lists
- Added `UndoTracker` to maintain state of undone operations across sessions
- Prevents errors when trying to undo already-undone operations
- Session file tracking for proper operation filtering

### Added
- Persistent undo history in `~/.ccundo/undone-operations.json`
- Automatic filtering of undone operations from Claude Code sessions

## [1.0.2] - 2025-07-05

### Fixed
- **Critical Fix**: File edit undo now correctly reverses only the specific string changes instead of replacing entire file content
- Fixed issue where undoing an edit operation would delete more content than intended
- Improved handling of Edit and MultiEdit operations from Claude Code sessions

### Changed
- Edit operations now track the specific strings that were changed (oldString/newString) rather than full file content
- UndoManager now performs targeted string replacements instead of full file overwrites
- Enhanced preview system to show exact string replacements that will be reversed

### Technical Details
- Claude session parser now properly extracts Edit tool parameters (old_string, new_string, replace_all)
- Support for MultiEdit operations with multiple string replacements
- More accurate undo behavior that matches the original Claude Code edit operations

## [Unreleased]

### Planned Features
- Additional language support
- Git integration for version-aware undo
- Plugin system for custom operation types
- Web interface for session management
- Batch operation support