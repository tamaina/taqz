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
    let data = { instances: {}, accounts:[] }
    try{
        let taqz = require('./taqz.json')
        let pdata = { instances: {} }
        pdata.instances[domain] = as.appSecret
        data = Object.assign(taqz, pdata)
        console.log('taqz.jsonが更新されました。このファイルは絶対に誰にも見せないでください。')
    } catch(e) {
        data.instances[domain] = as.appSecret
        console.log('taqz.jsonが作成されました。このファイルは絶対に誰にも見せないでください。')
    }
    return writeFile('misskey/taqz.json', JSON.stringify(data), 'utf8', () => {
        console.log('taqz misskey account を実行し、アカウントを追加してください。\n')
    })
})
.catch(err => { throw err })