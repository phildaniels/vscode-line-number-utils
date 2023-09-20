import * as path from 'path';
import * as extension from '../../../extension';
import {
  commands,
  env,
  Event,
  Extension,
  Position,
  Selection,
  TextDocument,
  TextDocumentChangeEvent,
  Uri,
  window,
  workspace,
} from 'vscode';
import { insertCursorsAtWord } from '../../../utils';
import { expect } from 'chai';
import { assert } from 'console';

const waitForDocumentChanges = async (
  document: TextDocument,
  onDidChangeTextDocument: Event<TextDocumentChangeEvent>,
  timeoutMs: number
) => {
  await new Promise<void>((resolve, reject) => {
    let resolved = false;
    setTimeout(() => {
      if (!resolved) {
        reject('Timed out waiting for document changes');
      }
    }, timeoutMs);
    onDidChangeTextDocument((event) => {
      if (event.document.uri.toString() === document.uri.toString()) {
        resolved = true;
        resolve();
      }
    });
  });
};

suite('integration/extension.ts', async () => {
  window.showInformationMessage('Starting integration tests');
  ('/home/phil/personal/vscode-line-number-utils/out/test/data/testFile.ts');
  test('allCommands', async function () {
    const pathToDummyFile = path.resolve(
      __dirname,
      '../../',
      'data',
      'testFile.js'
    );
    const uri = Uri.file(pathToDummyFile);
    const document = await workspace.openTextDocument(uri);
    await window.showTextDocument(document);
    const editor = window.activeTextEditor;
    if (!editor) {
      assert(false, 'editor is undefined');
      return;
    }
    await insertCursorsAtWord(editor, commands.executeCommand, '`\\);');

    await commands.executeCommand(
      'vscode-line-number-utils.copy-line-number(s)-at-cursor(s)-to-clipboard'
    );

    const textOnClipBoard = await env.clipboard.readText();

    expect(textOnClipBoard).to.deep.equal('2\n3\n4');

    await commands.executeCommand(
      'vscode-line-number-utils.insert-line-number(s)-at-cursor(s)'
    );

    await waitForDocumentChanges(
      document,
      workspace.onDidChangeTextDocument,
      5000
    );

    const textInEditor = editor.document.getText();
    const textInEditorRemovingWhiteSpace = textInEditor.replace(/\s/g, '');
    const expectedText =
      '"usestrict";console.log(`hello2`);console.log(`world3`);console.log(`it\'sme4`);//#sourceMappingURL=testFile.js.map';

    expect(textInEditorRemovingWhiteSpace).to.deep.equal(expectedText);

    await commands.executeCommand('workbench.action.closeActiveEditor');
  });
});
