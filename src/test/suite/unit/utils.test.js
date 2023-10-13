"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const utils_1 = require("../../../utils");
suite('unit/utils.ts', () => {
    test('getActiveLineNumbers_editorObjectNotValid_shouldReturn_emptylist', () => {
        const editorIsUndefinedResult = (0, utils_1.getActiveLineNumbers)();
        (0, chai_1.expect)(editorIsUndefinedResult).to.deep.equal([]);
        const editorSelectionsIsUndefinedResult = (0, utils_1.getActiveLineNumbers)({});
        (0, chai_1.expect)(editorSelectionsIsUndefinedResult).to.deep.equal([]);
        const editorSelectionsLengthIsZeroResult = (0, utils_1.getActiveLineNumbers)({
            selections: [],
        });
        (0, chai_1.expect)(editorSelectionsLengthIsZeroResult).to.deep.equal([]);
    });
    test('getActiveLineNumbers_editorObjectHasValidSelections_shouldReturn_expectedSelections', () => {
        const expected = [2, 3, 4];
        const firstSelection = {
            active: {
                line: 1,
            },
        };
        const secondSelection = {
            active: {
                line: 2,
            },
        };
        const thirdSelection = {
            active: {
                line: 3,
            },
        };
        const selections = [
            firstSelection,
            secondSelection,
            thirdSelection,
        ];
        const editor = {
            selections,
        };
        const actualResult = (0, utils_1.getActiveLineNumbers)(editor);
        (0, chai_1.expect)(actualResult).to.deep.equal(expected);
    });
    test('copyLineNumbersToClipBoard_novalidlinenumbers_nothingcopied', () => {
        const writeTextStub = (0, sinon_1.stub)();
        const mockClipboard = { writeText: writeTextStub };
        const lineNumbers = [];
        const actualResult = (0, utils_1.copyLineNumbersToClipBoard)(mockClipboard, lineNumbers);
        (0, chai_1.assert)(writeTextStub.notCalled, 'copyLineNumbersToClipBoard_novalidlinenumbers_nothingcopied writeTextStub.notCalled failed');
    });
    test('copyLineNumbersToClipBoard_validlinenumbers_expectedResultCopiedToClipBoard', () => {
        const expectedCopyText = '1\n2\n3';
        const writeTextStub = (0, sinon_1.stub)();
        const mockClipboard = { writeText: writeTextStub };
        const lineNumbers = [1, 2, 3];
        (0, utils_1.copyLineNumbersToClipBoard)(mockClipboard, lineNumbers);
        (0, chai_1.assert)(writeTextStub.calledWith(expectedCopyText), 'copyLineNumbersToClipBoard_novalidlinenumbers_nothingcopied writeTextStub.notCalled failed');
    });
    test('insertLineNumbers_editorObjectNotValid_shouldReturn', () => {
        const editStub = (0, sinon_1.stub)();
        const editor = {
            edit: editStub,
        };
        (0, utils_1.insertLineNumbers)(editor);
        (0, chai_1.assert)(editStub.notCalled, 'insertLineNumbers_editorObjectNotValid_shouldReturn editStub.notCalled failed');
    });
    test('insertLineNumbers_editorObjectValid_shouldbecalled_onceperselection', () => {
        const insertStub = (0, sinon_1.stub)();
        const edit = (callback) => {
            callback({ insert: insertStub });
        };
        const editor = {
            selections: [
                new vscode_1.Selection(0, 0, 0, 0),
                new vscode_1.Selection(1, 0, 1, 0),
                new vscode_1.Selection(2, 0, 2, 0),
            ],
            edit,
        };
        (0, utils_1.insertLineNumbers)(editor);
        (0, chai_1.expect)(insertStub.callCount).to.equal(3);
    });
    test('insertCursorsAtWord_editorObjectNotValid_shouldReturn', async () => {
        const executeCommandStub = (0, sinon_1.stub)();
        const editor = undefined;
        await (0, utils_1.insertCursorsAtWord)(editor, executeCommandStub, 'console');
        (0, chai_1.assert)(executeCommandStub.notCalled, 'insertCursorsAtWord_editorObjectNotValid_shouldReturn executeCommandStub.notCalled failed');
    });
    test('insertCursorsAtWord_editorObjectValid_shouldbecalled_onceperselection', async () => {
        const executeCommandStub = (0, sinon_1.stub)().resolves();
        let text = '"usestrict";console.log(`hello`);console.log(`world`);console.log(`it\'sme`);//#sourceMappingURL=testFile.js.map';
        const editor = {
            document: {
                getText: () => text,
                positionAt: (_) => ({
                    line: 0,
                    character: Math.floor(Math.random() * text.length - 1),
                }),
            },
            selections: [],
        };
        await (0, utils_1.insertCursorsAtWord)(editor, executeCommandStub, 'console');
        (0, chai_1.expect)(executeCommandStub.callCount).to.equal(4);
    });
});
//# sourceMappingURL=utils.test.js.map