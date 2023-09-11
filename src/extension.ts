import {
  type ExtensionContext,
  commands,
  window,
  type TextEditor,
} from 'vscode';

export const activate = (context: ExtensionContext) => {
  console.log('"vscode-line-number-utils" is now active!');
  let disposable = commands.registerCommand(
    'vscode-line-number-utils.copy-line-numbers-at-cursor(s)-to-clipboard',
    () => {}
  );

  context.subscriptions.push(disposable);
};

export const deactivate = () => {};
