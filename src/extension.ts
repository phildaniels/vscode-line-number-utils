import { type ExtensionContext, commands, env, window } from 'vscode';

import {
  copyLineNumbersToClipBoard,
  getActiveLineNumbers,
  insertLineNumbers,
} from './utils';

export const activate = (context: ExtensionContext) => {
  console.log('"vscode-line-number-utils" is now active!');

  let copyLineNumbersAtCursorsToClipboard = commands.registerCommand(
    'vscode-line-number-utils.copy-line-number(s)-at-cursor(s)-to-clipboard',
    async () => {
      const lineNumbers = getActiveLineNumbers(window.activeTextEditor);
      const thenable = copyLineNumbersToClipBoard(env.clipboard, lineNumbers);
      if (!thenable) {
        window.showInformationMessage(
          'No active cursors. Please select some text.'
        );
        return;
      }

      try {
        await thenable;
      } catch (error) {
        window.showErrorMessage('Error copying line numbers to clipboard!');
      }
    }
  );

  let insertLineNumbersAtCursors = commands.registerCommand(
    'vscode-line-number-utils.insert-line-number(s)-at-cursor(s)',
    async () => {
      if ((window.activeTextEditor?.selections?.length ?? 0) === 0) {
        window.showInformationMessage(
          'No active cursors. Please select some text.'
        );
        return;
      }
      insertLineNumbers(window.activeTextEditor);
    }
  );

  context.subscriptions.push(
    copyLineNumbersAtCursorsToClipboard,
    insertLineNumbersAtCursors
  );
};

export const deactivate = () => {};
