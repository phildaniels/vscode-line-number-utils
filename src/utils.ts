import { Clipboard, TextEditor } from 'vscode';

export const getActiveLineNumbers = (editor?: TextEditor): number[] => {
  if (!editor || !editor.selections || editor.selections.length === 0) {
    return [];
  }

  const lineNumbers = editor.selections.map(
    (selection) => selection.active.line
  );
  return lineNumbers;
};

export const copyLineNumbersToClipBoard = (
  clipboard: Clipboard,
  lineNumbers: number[]
): void => {
  if (!lineNumbers || lineNumbers.length === 0) {
    return;
  }

  const lineNumbersAsString = lineNumbers.join('\n');
  clipboard.writeText(lineNumbersAsString);
};
