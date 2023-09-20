import * as path from 'path';
import * as extension from '../../../extension';
import { commands, env, Extension, Uri, window, workspace } from 'vscode';
import { insertCursorsAtWord } from '../../../utils';
import { expect } from 'chai';
import { assert } from 'console';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    const editor = await window.showTextDocument(document);
    try {
      await commands.executeCommand('editor.action.selectAll');

      await commands.executeCommand('editor.action.moveLinesToTop');
      await insertCursorsAtWord(editor, commands.executeCommand, '`\\);');

      await commands.executeCommand(
        'vscode-line-number-utils.copy-line-number(s)-at-cursor(s)-to-clipboard'
      );
      await sleep(500);

      const textOnClipBoard = await env.clipboard.readText();

      expect(textOnClipBoard).to.deep.equal('2\n3\n4');

      await commands.executeCommand(
        'vscode-line-number-utils.insert-line-number(s)-at-cursor(s)'
      );
      await sleep(500);

      const textInEditor = editor.document.getText();
      const textInEditorRemovingWhiteSpace = textInEditor.replace(/\s/g, '');
      const expectedText =
        '"usestrict";console.log(`hello2`);console.log(`world3`);console.log(`it\'sme4`);//#sourceMappingURL=testFile.js.map';

      expect(textInEditorRemovingWhiteSpace).to.deep.equal(expectedText);

      await commands.executeCommand('workbench.action.closeActiveEditor');
    } catch (error) {
      assert(false);
    }
  }).timeout(600_000);
});
