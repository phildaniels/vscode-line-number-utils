import { Clipboard, TextEditor } from 'vscode';

export const getActiveLineNumbers = (editor?: TextEditor): number[] => {
  if (!editor || !editor.selections || editor.selections.length === 0) {
    return [];
  }

  const lineNumbers = editor.selections.map(
    (selection) => selection.active.line + 1
  );
  return lineNumbers;
};

export const copyLineNumbersToClipBoard = (
  clipboard: Clipboard,
  lineNumbers: number[]
): Thenable<void> | null => {
  if (!lineNumbers || lineNumbers.length === 0) {
    return null;
  }

  const lineNumbersAsString = lineNumbers.join('\n');
  return clipboard.writeText(lineNumbersAsString);
};

export const insertLineNumbers = (editor?: TextEditor) => {
  if (!editor || !editor.selections || editor.selections.length === 0) {
    return;
  }

  const selections = editor.selections;
  editor.edit((editBuilder) => {
    selections.forEach((selection) => {
      editBuilder.insert(selection.active, selection.active.line.toString());
    });
  });
};
