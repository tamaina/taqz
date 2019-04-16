console.log(`
taqz misskey <command>
  (index) (options)
          ･･････ 単純に投稿できます。
  (options)
      --id=, --username=, -n <username>
          ユーザーネーム(ID)を事前に設定できます。
          カンマ(,)区切りで複数アカウントを指定できます。
      --file=, --path=, -f <filename>
          ファイル名を指定し、その内容を投稿できます。
      --text=, --body=, -t <text>
          本文を直接指定します。

  instance  ･･････ インスタンスを登録します。いちばんはじめに実行してください。
  instance-userapp: /devからアカウントを作成するやり方でアプリを登録する方法でインスタンスを登録します。
  account   ･･････ 操作したいアカウントを追加するときに実行するコマンドです。
  account-onetime ･･･ 他のアプリで使用するために、必要な手順を踏まえて「i」を出力します。
  list      ･･････ 操作可能なアカウントIDを表示します。

  post-ws   ･･････ WebSocket経由で投稿します。

  help      ･･････ このコマンドです。
`)
