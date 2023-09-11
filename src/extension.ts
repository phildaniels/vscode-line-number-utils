import { type ExtensionContext, commands, window } from 'vscode';

export const activate = (context: ExtensionContext) => {
  console.log('"vscode-line-number-utils" is now active!');
  let disposable = commands.registerCommand(
    'vscode-line-number-utils.copy-line-numbers-at-cursor(s)-to-clipboard',
    () => {}
  );

  context.subscriptions.push(disposable);
};

export const getActiveLineNumbers = () => {
  const editor = window.activeTextEditor;
  if (!editor) {
    return [];
  }

  const lineNumbers = editor.selections.map(
    (selection) => selection.active.line
  );
  return lineNumbers;
};

export const deactivate = () => {};
