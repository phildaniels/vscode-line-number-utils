import { type ExtensionContext, commands, env, window } from 'vscode';

import {
  copyLineNumbersToClipBoard,
  getActiveLineNumbers,
  insertLineNumbers,
  insertSequentialLineNumbers,
} from './utils';

export const activate = (context: ExtensionContext) => {
  console.log('"vscode-line-number-utils" is now active!');

  const copyLineNumbersAtCursorsToClipboard = commands.registerCommand(
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

  const insertLineNumbersAtCursors = commands.registerCommand(
    'vscode-line-number-utils.insert-line-number(s)-at-cursor(s)',
    () => {
      if ((window.activeTextEditor?.selections?.length ?? 0) === 0) {
        window.showInformationMessage(
          'No active cursors. Please select some text.'
        );
        return;
      }
      insertLineNumbers(window.activeTextEditor);
    }
  );

  const insertSequentialLineNumbersAtCursors = commands.registerCommand(
    'vscode-line-number-utils.insert-sequential-number(s)-at-cursor(s)',
    async (...args: any[]) => {
      const selectionLength = window.activeTextEditor?.selections?.length ?? 0;
      if (selectionLength === 0) {
        window.showInformationMessage(
          'No active cursors. Please select some text.'
        );
        return;
      }

      if (args.length === 2) {
        const start = Number(args[0]);
        const step = Number(args[1]);
        insertSequentialLineNumbers(window.activeTextEditor, start, step);
        return;
      }

      let startString = await window.showInputBox({
        prompt: 'Enter starting number',
        placeHolder: '1',
        ignoreFocusOut: true,
      });
      if (Number.isNaN(Number(startString))) {
        window.showErrorMessage(
          'Invalid starting number, please input a number'
        );
        return;
      }
      const selectionLengthNow =
        window.activeTextEditor?.selections?.length ?? 0;
      if (selectionLengthNow === 0) {
        window.showErrorMessage(
          'You must have removed your cursors, please try again with one or more cursors.'
        );
        return;
      }

      let stepString: string | undefined;
      if (selectionLengthNow > 0) {
        stepString = await window.showInputBox({
          prompt: 'Enter step',
          placeHolder: '1',
          ignoreFocusOut: true,
        });
      }

      if (stepString && Number.isNaN(Number(stepString))) {
        window.showErrorMessage('Invalid step, please input a number');
      }

      const start = Number(startString);
      const step = Number(stepString ?? 1);
      insertSequentialLineNumbers(window.activeTextEditor, start, step);
    }
  );

  const insertDefaultSequentialLineNumbersAtCursors = commands.registerCommand(
    'vscode-line-number-utils.insert-default-sequential-number(s)-at-cursor(s)',
    async () => {
      const selectionLength = window.activeTextEditor?.selections?.length ?? 0;
      if (selectionLength === 0) {
        window.showInformationMessage(
          'No active cursors. Please select some text.'
        );
        return;
      }
      insertSequentialLineNumbers(window.activeTextEditor, 1, 1);
    }
  );

  context.subscriptions.push(
    copyLineNumbersAtCursorsToClipboard,
    insertLineNumbersAtCursors,
    insertSequentialLineNumbersAtCursors,
    insertDefaultSequentialLineNumbersAtCursors
  );
};

export const deactivate = () => {};
