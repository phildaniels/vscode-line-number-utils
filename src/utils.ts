import {
  type Clipboard,
  type TextEditor,
  type commands,
  Selection,
} from 'vscode';

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
      editBuilder.insert(
        selection.active,
        (selection.active.line + 1).toString()
      );
    });
  });
};

export const insertSequentialLineNumbers = (
  editor?: TextEditor,
  start?: number,
  step?: number
) => {
  if (!editor || !editor.selections || editor.selections.length === 0) {
    return;
  }
  let index = start ?? 0;
  let increment = step ?? 1;
  const selections = editor.selections;
  editor.edit((editBuilder) => {
    selections.forEach((selection) => {
      editBuilder.insert(selection.active, index?.toString());
      index = index + increment;
    });
  });
};

export type ExecuteCommand = typeof commands.executeCommand;

export const insertCursorsAtWord = async (
  editor: TextEditor | undefined,
  executeCommand: ExecuteCommand,
  word: string
) => {
  if (!editor) {
    return;
  }

  const document = editor.document;
  const text = document.getText();
  const regex = new RegExp(word, 'g');
  let match;

  await executeCommand('cursorTop');
  editor.selections = [];
  while ((match = regex.exec(text))) {
    const position = document.positionAt(match.index);
    const selection = new Selection(position, position);
    editor.selections = [...editor.selections, selection];
    await executeCommand('editor.action.addSelectionToNextFindMatch');
  }
};
