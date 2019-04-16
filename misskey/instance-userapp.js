const          util = require('util')
const     promisify = util.promisify
const            fs = require('fs')
const      inquirer = require('inquirer')
const     writeFile = promisify(fs.writeFile)

let domain

let form = [
    {
        type: 'input',
        name: 'domain',
        message: 'Instance Domain :',
        default: 'misskey.xyz'
    }
]
console.log('インスタンスのドメインを入力します。')
inquirer.prompt(form)
.then(as => {
    domain = as.domain
    let form = [
        {
            type: 'input',
            name: 'appSecret',
            message: 'App Secret:'
        }
    ]
    console.log(`\nhttps://${domain}/dev にアクセスし、アプリを作成してください。\nそして、以下の情報を貼り付けてください。`)
    return inquirer.prompt(form)
})
.then(as => {
    let taqz = { instances: {}, accounts:[] }
    try{
        taqz = require('./taqz.json')
        taqz.instances[domain] = as.appSecret
    } catch(e) {
        taqz.instances[domain] = as.appSecret
    }
    console.log('taqz.jsonが更新されました。このファイルは絶対に誰にも見せないでください。')
    return writeFile('misskey/taqz.json', JSON.stringify(taqz), 'utf8', () => {
        console.log('taqz misskey account を実行し、アカウントを追加してください。\n')
    })
})
.catch(err => { throw err })
