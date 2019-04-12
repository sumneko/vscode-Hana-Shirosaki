'use strict';
import * as vscode from 'vscode';
import * as path from 'path';

export class ReminderView {
    private static panel: vscode.WebviewPanel | undefined;

    public static show(context: vscode.ExtensionContext) {
        if (this.panel) {
            this.panel.reveal();
        } else {
            this.panel = vscode.window.createWebviewPanel("hana", "白咲花", vscode.ViewColumn.Two, {
                enableScripts: true,
                retainContextWhenHidden: true,
            });

            const imagePath = vscode.Uri.file(path.join(context.extensionPath, 'images', 'hana.gif'))
                .with({ scheme: 'vscode-resource' });

            this.panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>白咲花</title>
</head>
<body>
    <div><h1>这么长时间了，点心还没好吗~</h1></div>
    <div><img src="${imagePath}"></div>
</body>
</html>`;

            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
        }
    }
}
