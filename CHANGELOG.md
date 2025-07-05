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

## [Unreleased]

### Planned Features
- Additional language support
- Git integration for version-aware undo
- Plugin system for custom operation types
- Web interface for session management
- Batch operation support