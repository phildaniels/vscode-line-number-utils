import { type Clipboard, type TextEditor, Selection } from 'vscode';

import { assert, expect } from 'chai';
import { stub } from 'sinon';

import {
  type ExecuteCommand,
  copyLineNumbersToClipBoard,
  getActiveLineNumbers,
  insertCursorsAtWord,
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
    const expected = [2, 3, 4];
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
    const insertStub = stub();

    const edit = (callback: (editBuilder: TextEditor) => void) => {
      callback({ insert: insertStub } as unknown as TextEditor);
    };

    const editor = {
      selections: [
        new Selection(0, 0, 0, 0),
        new Selection(1, 0, 1, 0),
        new Selection(2, 0, 2, 0),
      ],
      edit,
    };

    insertLineNumbers(editor as unknown as TextEditor);

    expect(insertStub.callCount).to.equal(3);
  });

  // test('insertCursorsAtWord_editorObjectNotValid_shouldReturn', () => {
  //   const executeCommandStub = stub<
  //     [command: string, ...rest: unknown[]],
  //     Thenable<unknown>
  //   >();
  //   const editor = {} as unknown as TextEditor;

  //   insertCursorsAtWord(
  //     editor,
  //     executeCommandStub as unknown as ExecuteCommand,
  //     'console'
  //   );
  //   assert(
  //     executeCommandStub.notCalled,
  //     'insertCursorsAtWord_editorObjectNotValid_shouldReturn executeCommandStub.notCalled failed'
  //   );
  // });
  // test('insertCursorsAtWord_editorObjectValid_shouldbecalled_onceperselection', () => {
  //   const executeCommandStub = stub<
  //     [command: string, ...rest: unknown[]],
  //     Thenable<unknown>
  //   >();
  //   const editor = {
  //     document: {
  //       getText: () =>
  //         "console.log(`hello`);\n\nconsole.log(`world`);\n\nconsole.log(`it's me`);",
  //       positionAt: (_: number) => ({ line: Math.random() }),
  //     },
  //     selections: [],
  //   } as unknown as TextEditor;

  //   insertCursorsAtWord(
  //     editor,
  //     executeCommandStub as unknown as ExecuteCommand,
  //     'console'
  //   );
  //   expect(executeCommandStub.callCount).to.equal(3);
  // });
});
