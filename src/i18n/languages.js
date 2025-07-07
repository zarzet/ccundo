export const languages = {
  en: {
    name: 'English',
    messages: {
      // Command descriptions
      'cmd.list.description': 'List all operations in the current Claude Code session',
      'cmd.undo.description': 'Undo operations from the current Claude Code session',
      'cmd.redo.description': 'Redo previously undone operations',
      'cmd.preview.description': 'Preview what would be undone without making changes',
      'cmd.sessions.description': 'List all available Claude Code sessions',
      'cmd.session.description': 'Switch to a different session',
      'cmd.language.description': 'Set the interface language',
      
      // Options
      'opt.all': 'Show all operations including undone ones',
      'opt.session': 'Specify session ID',
      'opt.claude': 'Show operations from Claude Code session (default)',
      'opt.local': 'Show operations from local ccundo tracking',
      'opt.yes': 'Skip confirmation',
      
      // Messages
      'msg.no_active_session': 'No active Claude Code session found in this directory.',
      'msg.make_sure_directory': 'Make sure you are in a directory where Claude Code has been used.',
      'msg.no_local_session': 'No local ccundo session found.',
      'msg.no_operations': 'No operations found.',
      'msg.no_operations_to_undo': 'No operations to undo.',
      'msg.no_operations_to_redo': 'No operations to redo.',
      'msg.operation_not_found': 'Operation {id} not found.',
      'msg.already_undone': 'This operation has already been undone.',
      'msg.undo_cancelled': 'Undo cancelled.',
      'msg.no_sessions_found': 'No Claude Code sessions found.',
      'msg.no_local_sessions': 'No local sessions found.',
      'msg.language_set': 'Language set to {language}.',
      'msg.language_invalid': 'Invalid language. Available languages: {languages}',
      
      // Prompts
      'prompt.select_operation_undo': 'Select operation to undo:',
      'prompt.select_operation_redo': 'Select operation to redo:',
      'prompt.select_operation_preview': 'Select operation to preview:',
      'prompt.confirm_undo': 'Are you sure you want to undo these {count} operations?',
      'prompt.confirm_redo': 'Are you sure you want to redo these {count} operations?',
      'prompt.cascading_warning': '⚠️  Cascading undo: Selecting an operation will undo it and ALL operations that came after it.',
      
      // Operation types
      'op.file_create': 'file_create',
      'op.file_edit': 'file_edit',
      'op.file_delete': 'file_delete',
      'op.file_rename': 'file_rename',
      'op.directory_create': 'directory_create',
      'op.directory_delete': 'directory_delete',
      'op.bash_command': 'bash_command',
      
      // Operation actions
      'action.will_delete_file': 'Will delete file:',
      'action.will_revert_file': 'Will revert file:',
      'action.will_restore_file': 'Will restore file:',
      'action.will_rename_back': 'Will rename back:',
      'action.will_remove_directory': 'Will remove directory:',
      'action.will_restore_directory': 'Will restore directory:',
      'action.cannot_undo_bash': 'Cannot auto-undo bash command:',
      'action.manual_intervention': 'Manual intervention required',
      
      // Headers
      'header.operations_claude': 'Operations from Claude Code session:',
      'header.operations_local': 'Operations in local session {sessionId}:',
      'header.available_sessions_claude': 'Available Claude Code sessions:',
      'header.available_sessions_local': 'Available local sessions:',
      'header.preview': '📋 Preview: Would undo {count} operation(s):',
      'header.undoing': 'Undoing {count} operations...',
      'header.redoing': 'Redoing {count} operations...',
      'header.this_will_undo': 'This will undo {count} operation(s):',
      'header.this_will_redo': 'This will redo {count} operation(s):',
      
      // Status
      'status.active': '[ACTIVE]',
      'status.undone': '[UNDONE]',
      'status.current_content': 'Current content:',
      'status.content_to_restore': 'Content to restore:',
      'status.original_not_available': '(Original content not available from session)',
      'status.content_not_available': '(Content not available from session)',
      'status.completed': 'Completed: {success} successful, {failed} failed',
      
      // Time
      'time.seconds_ago': '{seconds}s ago',
      'time.minutes_ago': '{minutes}m ago',
      'time.hours_ago': '{hours}h ago',
      'time.days_ago': '{days}d ago',
      
      // Suffixes
      'suffix.more_operations': '(+ {count} more will be undone)',
      'suffix.more_would_be_undone': '(+ {count} more would be undone)',
      'suffix.tip_to_undo': '💡 To actually perform these undos, run: ccundo undo'
    }
  },
  
  ja: {
    name: '日本語',
    messages: {
      // Command descriptions
      'cmd.list.description': '現在のClaude Codeセッションのすべての操作を一覧表示',
      'cmd.undo.description': '現在のClaude Codeセッションの操作を元に戻す',
      'cmd.redo.description': '以前に元に戻した操作をやり直し',
      'cmd.preview.description': '変更を加えずに元に戻される内容をプレビュー',
      'cmd.sessions.description': '利用可能なすべてのClaude Codeセッションを一覧表示',
      'cmd.session.description': '別のセッションに切り替え',
      'cmd.language.description': 'インターフェース言語を設定',
      
      // Options
      'opt.all': '元に戻された操作も含めてすべての操作を表示',
      'opt.session': 'セッションIDを指定',
      'opt.claude': 'Claude Codeセッションの操作を表示（デフォルト）',
      'opt.local': 'ローカルccundo追跡の操作を表示',
      'opt.yes': '確認をスキップ',
      
      // Messages
      'msg.no_active_session': 'このディレクトリでアクティブなClaude Codeセッションが見つかりません。',
      'msg.make_sure_directory': 'Claude Codeが使用されたディレクトリにいることを確認してください。',
      'msg.no_local_session': 'ローカルccundoセッションが見つかりません。',
      'msg.no_operations': '操作が見つかりません。',
      'msg.no_operations_to_undo': '元に戻す操作がありません。',
      'msg.no_operations_to_redo': 'やり直す操作がありません。',
      'msg.operation_not_found': '操作 {id} が見つかりません。',
      'msg.already_undone': 'この操作は既に元に戻されています。',
      'msg.undo_cancelled': '元に戻す操作がキャンセルされました。',
      'msg.no_sessions_found': 'Claude Codeセッションが見つかりません。',
      'msg.no_local_sessions': 'ローカルセッションが見つかりません。',
      'msg.language_set': '言語が{language}に設定されました。',
      'msg.language_invalid': '無効な言語です。利用可能な言語: {languages}',
      
      // Prompts
      'prompt.select_operation_undo': '元に戻す操作を選択:',
      'prompt.select_operation_redo': 'やり直す操作を選択:',
      'prompt.select_operation_preview': 'プレビューする操作を選択:',
      'prompt.confirm_undo': 'これら{count}個の操作を本当に元に戻しますか？',
      'prompt.confirm_redo': 'これら{count}個の操作を本当にやり直しますか？',
      'prompt.cascading_warning': '⚠️  カスケード元に戻し: 操作を選択すると、その操作とその後のすべての操作が元に戻されます。',
      
      // Operation types
      'op.file_create': 'ファイル作成',
      'op.file_edit': 'ファイル編集',
      'op.file_delete': 'ファイル削除',
      'op.file_rename': 'ファイル名変更',
      'op.directory_create': 'ディレクトリ作成',
      'op.directory_delete': 'ディレクトリ削除',
      'op.bash_command': 'bashコマンド',
      
      // Operation actions
      'action.will_delete_file': 'ファイルを削除します:',
      'action.will_revert_file': 'ファイルを元に戻します:',
      'action.will_restore_file': 'ファイルを復元します:',
      'action.will_rename_back': '名前を元に戻します:',
      'action.will_remove_directory': 'ディレクトリを削除します:',
      'action.will_restore_directory': 'ディレクトリを復元します:',
      'action.cannot_undo_bash': 'bashコマンドを自動で元に戻せません:',
      'action.manual_intervention': '手動での対応が必要です',
      
      // Headers
      'header.operations_claude': 'Claude Codeセッションの操作:',
      'header.operations_local': 'ローカルセッション {sessionId} の操作:',
      'header.available_sessions_claude': '利用可能なClaude Codeセッション:',
      'header.available_sessions_local': '利用可能なローカルセッション:',
      'header.preview': '📋 プレビュー: {count}個の操作を元に戻します:',
      'header.undoing': '{count}個の操作を元に戻しています...',
      'header.redoing': '{count}個の操作をやり直しています...',
      'header.this_will_undo': 'これにより{count}個の操作が元に戻されます:',
      'header.this_will_redo': 'これにより{count}個の操作がやり直されます:',
      
      // Status
      'status.active': '[アクティブ]',
      'status.undone': '[元に戻し済み]',
      'status.current_content': '現在の内容:',
      'status.content_to_restore': '復元する内容:',
      'status.original_not_available': '（セッションから元の内容を取得できません）',
      'status.content_not_available': '（セッションから内容を取得できません）',
      'status.completed': '完了: {success}個成功、{failed}個失敗',
      
      // Time
      'time.seconds_ago': '{seconds}秒前',
      'time.minutes_ago': '{minutes}分前',
      'time.hours_ago': '{hours}時間前',
      'time.days_ago': '{days}日前',
      
      // Suffixes
      'suffix.more_operations': '（+ {count}個も元に戻されます）',
      'suffix.more_would_be_undone': '（+ {count}個も元に戻されます）',
      'suffix.tip_to_undo': '💡 実際に元に戻すには次を実行: ccundo undo'
    }
  }
};