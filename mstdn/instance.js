const          util = require('util')
const     promisify = util.promisify
const            fs = require('fs')
const      inquirer = require('inquirer')
const     writeFile = promisify(fs.writeFile)
const      Mastodon = require('mastodon-api')

let domain

let form = [
    {
        type: 'input',
        name: 'domain',
        message: 'Instance Domain:',
        default: 'mstdn.jp'
    },
    {
        type: 'input',
        name: 'name',
        message: 'App Name:',
        default: 'taqz'
    }
]
console.log('\nインスタンスのドメインと、アプリ名を入力します。')
inquirer.prompt(form)
.then(as => {
    domain = as.domain
    return Mastodon.createOAuthApp(`https://${as.domain}/api/v1/apps`, as.name, 'read write follow')
})
.then(body => {
    let taqz = { instances: {}, accounts:[] }
    try{
        taqz = require('./taqz.json')
        taqz.instances[domain] = { app: body }
        console.log('taqz.jsonが更新されました。このファイルは絶対に誰にも見せないでください。')
    } catch(e) {
        taqz.instances[domain] = { app: body }
        console.log('taqz.jsonが作成されました。このファイルは絶対に誰にも見せないでください。')
    }
    return writeFile('mstdn/taqz.json', JSON.stringify(taqz), 'utf8', () => {
        console.log('taqz mstdn account を実行し、アカウントを追加してください。\n')
    })
})
.catch(err => { throw err })