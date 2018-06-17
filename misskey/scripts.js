const       request = require('request')
const      inquirer = require('inquirer')
const        crypto = require('crypto')

module.exports = {
    accountOnetime: () => {
        let form = [
            {
                type: 'input',
                name: 'domain',
                message: 'インスタンスのドメイン :',
                default: 'misskey.xyz'
            },
            {
                type: 'input',
                name: 'appSecret',
                message: 'App Secret:'
            }
        ]
        console.log('他のアプリで利用するために、iを出力します。taqz.jsonには記録しません。\n')
        console.log(`\nhttps://<domain>/dev にアクセスし、アプリを作成してください。\n以下にドメインとApp Secretを入力します。`)
        return inquirer.prompt(form)
        .then(as => { return new Promise((resolve, reject) => {
            request.post(`https://${as.domain}/api/auth/session/generate`, { json: { 'appSecret': as.appSecret } },
            function(e, r, generate){
                if(e) throw e
                console.log('以下のURLにアクセスしてください。\n')
                console.log(generate.url + '\n')
                let form = [
                    {
                        type: 'list',
                        name: 'yn',
                        message: '操作が完了したらEnterを押して続行します。nを選択すると中止します。 :',
                        choices: ['y','n']
                    }
                ]
                inquirer.prompt(form)
                .then(as2 => {
                    if(as2.yn == 'n') { reject('ユーザーが操作の中断を選択しました。') }
                    request.post(`https://${as.domain}/api/auth/session/userkey`, { json: {'appSecret': as.appSecret, 'token': generate.token} }, function (e, r, userkey) {
                        if(e) reject(e)
                        if(userkey.err) reject(userkey.err)
                        const hashit = crypto.createHash('sha256')
                        hashit.update(`${userkey.accessToken}${as.appSecret}`)
                        const i = hashit.digest('hex')
                        console.log(`\n正常に処理が完了しました。`)
                        console.log(`${userkey.user.username}@${as.domain}`)
                        console.log(`i: ${i}`)
                        resolve(i)
                    })
                })
                .catch(err => { reject(err) })
            })
        })})
        .catch(err => { throw err })
    }
}