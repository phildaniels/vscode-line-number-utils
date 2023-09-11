import { type TextEditor, type Selection, type Clipboard } from 'vscode';

import { assert, expect } from 'chai';

import { stub } from 'sinon';
import {
  copyLineNumbersToClipBoard,
  getActiveLineNumbers,
  insertLineNumbers,
} from '../../../utils';

suite('unit/utils.ts', () => {
  test('getActiveLineNumbers_editorObjectNotValid_shouldReturn_emptylist', () => {
    const editorIsUndefinedResult = getActiveLineNumbers();

    expect(editorIsUndefinedResult).to.deep.equal([]);

    const editorSelectionsIsUndefinedResult = getActiveLineNumbers(
      {} as TextEditor
    );

    expect(editorSelectionsIsUndefinedResult).to.deep.equal([]);

    const editorSelectionsLengthIsZeroResult = getActiveLineNumbers({
      selections: [] as readonly Selection[],
    } as TextEditor);

    expect(editorSelectionsLengthIsZeroResult).to.deep.equal([]);
  });

  test('getActiveLineNumbers_editorObjectHasValidSelections_shouldReturn_expectedSelections', () => {
    const expected = [1, 2, 3];
    const firstSelection = {
      active: {
        line: 1,
      },
    } as Selection;
    const secondSelection = {
      active: {
        line: 2,
      },
    } as Selection;
    const thirdSelection = {
      active: {
        line: 3,
      },
    } as Selection;

    const selections = [
      firstSelection,
      secondSelection,
      thirdSelection,
    ] as readonly Selection[];

    const editor = {
      selections,
    } as TextEditor;

    const actualResult = getActiveLineNumbers(editor);

    expect(actualResult).to.deep.equal(expected);
  });

  test('copyLineNumbersToClipBoard_novalidlinenumbers_nothingcopied', () => {
    const writeTextStub = stub<[value: string], Thenable<void>>();
    const mockClipboard = { writeText: writeTextStub } as unknown as Clipboard;
    const lineNumbers = [] as number[];
    const actualResult = copyLineNumbersToClipBoard(mockClipboard, lineNumbers);
    assert(
      writeTextStub.notCalled,
      'copyLineNumbersToClipBoard_novalidlinenumbers_nothingcopied writeTextStub.notCalled failed'
    );
  });

  test('copyLineNumbersToClipBoard_validlinenumbers_expectedResultCopiedToClipBoard', () => {
    const expectedCopyText = '1\n2\n3';
    const writeTextStub = stub<[value: string], Thenable<void>>();
    const mockClipboard = { writeText: writeTextStub } as unknown as Clipboard;
    const lineNumbers = [1, 2, 3];
    copyLineNumbersToClipBoard(mockClipboard, lineNumbers);
    assert(
      writeTextStub.calledWith(expectedCopyText),
      'copyLineNumbersToClipBoard_novalidlinenumbers_nothingcopied writeTextStub.notCalled failed'
    );
  });

  // export const insertLineNumbers = (editor?: TextEditor) => {
  //   if (!editor) {
  //     return;
  //   }

  //   const selections = editor.selections;
  //   editor.edit((editBuilder) => {
  //     selections.forEach((selection) => {
  //       editBuilder.insert(selection.active, selection.active.line.toString());
  //     });
  //   });
  // };

  test('insertLineNumbers_editorObjectNotValid_shouldReturn', () => {
    const editStub = stub<
      [
        callback: (editBuilder: {
          insert: (position: unknown, text: string) => void;
        }) => void
      ],
      Thenable<boolean>
    >();
    const editor = {
      edit: editStub,
    } as unknown as TextEditor;

    insertLineNumbers(editor);
    assert(
      editStub.notCalled,
      'insertLineNumbers_editorObjectNotValid_shouldReturn editStub.notCalled failed'
    );
  });

  test('insertLineNumbers_editorObjectValid_shouldbecalled_onceperselection', () => {
    const editStub = stub<
      [
        callback: (editBuilder: {
          insert: (position: unknown, text: string) => void;
        }) => void
      ],
      Thenable<boolean>
    >();
    const editor = {
      edit: editStub,
      selections: [
        {
          active: {
            line: 1,
          },
        },
        {
          active: {
            line: 2,
          },
        },
        {
          active: {
            line: 3,
          },
        },
      ],
    } as unknown as TextEditor;

    insertLineNumbers(editor);
    assert(
      editStub.calledThrice,
      'insertLineNumbers_editorObjectValid_shouldbecalled_onceperselection editStub.calledThrice failed'
    );
  });
});
