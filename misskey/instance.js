const          util = require('util')
const     promisify = util.promisify
const            fs = require('fs')
const      inquirer = require('inquirer')
const     writeFile = promisify(fs.writeFile)
const       request = require('request')

let domain

let form = [
    {
        type: 'input',
        name: 'domain',
        message: 'Instance Domain :',
        default: 'misskey.xyz'
    },
    {
        type: 'input',
        name: 'name',
        message: 'Name :',
        default: 'taqz'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description :',
        default: 'taqz command-line client app'
    },
    {
        type: 'checkbox',
        name: 'permission',
        message: 'Permissions :',
        choices: [
            'read:account',
            'write:account',
            'write:notes'
        ]
    }
]
console.log('インスタンスの情報を入力します。')
inquirer.prompt(form)
.then(as => {
    domain = as.domain
    return new Promise((res, rej) => {
        request.post(`https://${as.domain}/api/app/create`, { json: {'name': as.name, 'description': as.description, 'permission': as.permission} }, (e, r, result) => {
            if (e) {
                console.log(e)
                return rej(e)
            }
            console.log(result)
            res(result)
        })
    })
})
.then(as => {
    let taqz = { instances: {}, accounts:[] }
    try{
        taqz = require('./taqz.json')
    } catch(e) {}

    taqz.instances[domain] = as.secret

    console.log('taqz.jsonが更新されました。このファイルは絶対に誰にも見せないでください。')
    return writeFile('misskey/taqz.json', JSON.stringify(taqz), 'utf8', () => {
        console.log('taqz misskey account を実行し、アカウントを追加してください。\n')
    })
})
.catch(err => { throw err })
