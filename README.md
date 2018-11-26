# taqz
Misskey、TwitterおよびMastodonの、コマンドラインで動く簡単なクライアントです。

## Install/Usage
taqzの動作には**node.js**が必要です。node.jsの新しめのバージョンをインストールしてください。

### In global
`taqz`コマンドをインストールします。  
(通常はこの方法でインストールした場合で解説します。)

#### Install
```
npm i -g taqz
```

#### Usage
```
taqz <Service> <Command>
```

### Cloning/Downloading Files
#### Installing
GitHubリポジトリをZipでダウンロードするか、GitでCloneします。

#### Usage
````
cd path-to-directory
node <Service>/<Command>
````

## Tips
- ファイルからの投稿を除き、本文で"\n"を記入すると改行になります。

## Commands

### Root

- `taqz post (options)`  
  複数のサービスにわたって同時に投稿できます。
  * (options)
    * `-t <本文>`
    * `-h <タグ(,区切り)>`

### Misskey

- `taqz misskey <command>`
  * `instance`  ･･････ インスタンスを登録します。いちばんはじめに実行してください。
  * `account`   ･･････ 操作したいアカウントを追加するときに実行するコマンドです。
  * `list`      ･･････ 操作可能なアカウントIDを表示します。
  * `(index) (options)`  
            ･･････ 単純に投稿できます。
    * (options)
      *  `--id=, --username=, -n <username>`  
            ユーザーネーム(ID@インスタンスドメイン)を事前に設定できます。
            カンマ,区切りで複数アカウントを指定できます。
      *  `--file=, --path=, -f <filename>`  
            ファイル名を指定し、その内容を投稿できます。
      *  `--text=, --body=, -t <text>`  
            本文を直接指定します。
  * `account-onetime`   ･･････ 他のアプリで使用するために、必要な手順を踏まえて「i」を出力します。
  * `help`      ･･････ この内容を表示します。

### Twitter

**複数のアカウントで同時に呟くことはできません。**

- `taqz twitter <command>`
  * `init`      ･･････ いちばんはじめに実行するコマンドです。
  * `account`   ･･････ 操作したいアカウントを追加するときに実行するコマンドです。
  * `list`      ･･････ 操作可能なアカウントIDを表示します。
  * `(index) (options)`  
            ･･････ 単純にツイートできます。
    * (options)
      *  `--id=, --screen_name=, -n <screen_name>`  
            スクリーンネームを事前に設定できます。
            カンマ,区切りで複数アカウントを指定できます。
      *  `--file=, --path=, -f <filename>`  
            ファイル名を指定し、その内容を投稿できます。
      *  `--text=, --body=, -s <text>`  
            本文を直接指定します。
  * `help`      ･･････ この内容を表示します。


### Mastodon

- `taqz mstdn <command>`
  * `instance`  ･･････ インスタンスを登録します。いちばんはじめに実行するコマンドです。
  * `account`   ･･････ 操作したいアカウントを追加するときに実行するコマンドです。
  * `list`      ･･････ 操作可能なアカウントIDを表示します。
  * `(index) (options)`  
            ･･････ 単純にトゥートできます。
    * (options)
      *  `--id=, --screem_name=, -n <username>`  
            ユーザーネーム(ID@インスタンスドメイン)を事前に設定できます。
            カンマ,区切りで複数アカウントを指定できます。
      *  `--file=, --path=, -f <filename>`  
            ファイル名を指定し、その内容を投稿できます。
      *  `--text=, --body=, -t <text>`  
            本文を直接指定します。
  * `help`      ･･････ この内容を表示します。