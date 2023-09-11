import { type ExtensionContext, commands, window } from "vscode";

export function activate(context: ExtensionContext) {
  console.log(
    'Congratulations, your extension "vscode-line-number-utils" is now active!'
  );
  let disposable = commands.registerCommand(
    "vscode-line-number-utils.helloWorld",
    () => {
      window.showInformationMessage(
        "Hello World from vscode-line-number-utils!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
