# Open Link as
Google Chrome拡張「Open Link as」は、Google Spreadsheet上のリンクを、指定した別のChromeプロファイルで簡単に開くことができる拡張機能です。  
右クリックメニュー「Open Link as > {プロファイル}」の機能をワンステップで実行できるようにしました。
現状、Macのみ対応してます。

## 主な特徴
- Google Spreadsheetのリンク横に「外部リンク」アイコンボタンを追加し、クリックすると別プロファイルで開ける
- プロファイル名（表示名またはディレクトリ名）は拡張アイコンのポップアップから設定可能
- ネイティブメッセージングを利用し、macOSのChromeプロファイルを指定して新規ウィンドウで開く

## 使い方
1. 拡張をインストールし、ネイティブメッセージングのセットアップを行う
   1. templateファイルをコピーする
      1. `cp -R native-scripts-template native-scripts`
   2. Pythonファイルのシンボリックリンクを、任意のbinディレクトリに作成する
      1. ln -s /path/to/native-scripts/com.kaishoya.openlinkprofile.py /usr/local/bin/com.yourdomain.openlinkprofile
   3. ./native-scripts/com.kaishoya.openlinkprofile.jsonファイルの `allowed_origins` の `[chrome-extension-id]` の部分を実際の拡張機能のIDに修正する
2. 拡張アイコンをクリックし、プロファイル名（例: Profile 2 など）を設定
3. Google Spreadsheetでリンク横のアイコンをクリック、または右クリックメニューから「Open Link as」を選択
4. 指定したChromeプロファイルでリンクが新規ウィンドウで開かれます
