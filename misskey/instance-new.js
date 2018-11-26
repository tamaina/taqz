const          util = require('util')
const     promisify = util.promisify
const            fs = require('fs')
const      inquirer = require('inquirer')
const       request = require('request')
const          post = promisify(request.post)
const     writeFile = promisify(fs.writeFile)

let domain

let form = [
    {
        type: 'input',
        name: 'domain',
        message: 'Instance Domain:',
        default: 'misskey.xyz'
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
    return post('', {json:{ as. }})
})
.then(res => {
    const body = res.body
    console.log('body')
    let data = { instances: {}, accounts:[] }
    try{
        let taqz = require('./taqz.json')
        let pdata = { instances: {} }
        pdata.instances[domain] = { app: body }
        data = Object.assign(taqz, pdata)
        console.log('taqz.jsonが更新されました。このファイルは絶対に誰にも見せないでください。')
    } catch(e) {
        data.instances[domain] = { app: body }
        console.log('taqz.jsonが作成されました。このファイルは絶対に誰にも見せないでください。')
    }
    return writeFile('mstdn/taqz.json', JSON.stringify(data), 'utf8', () => {
        console.log('taqz mstdn account を実行し、アカウントを追加してください。\n')
    })
})
.catch(err => { throw err })