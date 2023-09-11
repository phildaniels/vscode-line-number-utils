import * as path from 'path';
import * as extension from '../../../extension';
import { window, Uri, workspace, Extension } from 'vscode';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

suite('integration/extension.ts', () => {
  window.showInformationMessage('Starting integration tests');
  ('/home/phil/personal/vscode-line-number-utils/out/test/data/testFile.ts');
  test('allCommands', async () => {
    const pathToDummyFile = path.resolve(
      __dirname,
      '../../',
      'data',
      'testFile.js'
    );
    const uri = Uri.file(pathToDummyFile);
    const document = await workspace.openTextDocument(uri);
    const editor = await window.showTextDocument(document);
    await sleep(500);
    // const [decArray, errDecArray] = await extension.createDecorations(
    //   editor,
    //   editor.document.getText()
    // );

    // assert.deepEqual(decArray.length, 1);
    // assert.deepEqual(errDecArray.length, 0);

    // vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  });
});
