import { type ExtensionContext, commands, window } from "vscode";

export function activate(context: ExtensionContext) {
  console.log(
    'Congratulations, your extension "vscode-type-preview-shortener" is now active!'
  );
  let disposable = commands.registerCommand(
    "vscode-type-preview-shortener.helloWorld",
    () => {
      window.showInformationMessage(
        "Hello World from vscode-type-preview-shortener!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
