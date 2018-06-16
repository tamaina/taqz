const          util = require('util')
const     promisify = util.promisify
const            fs = require('fs')
const      minimist = require('minimist')
const       request = require('request')
const      inquirer = require('inquirer')
const     websocket = require('websocket')

const readFile = promisify(fs.readFile)
const taqz = (function(){
    try{
        return require('./taqz.json')
    } catch(e) {
        throw Error('初期化されていません。 node misskey/instance を実行し、初期化してください。')
    }
})()
if(taqz.accounts.length == 0) throw Error('アカウントがありません。node misskey/account を実行し、アカウントを登録してください。')

const argv = minimist(process.argv.slice(1))

const display = {
    post: function(post){
        console.log(`\n${post.user.name} @${post.user.username}`)
        if(post.text) console.log(post.text)
        if(post.repost){
            console.log('   RE:')
            console.log(`   ${post.repost.user.name} @${post.repost.user.username}`)
            console.log('   ' + post.repost.text)
        }
    }
}

require('../scripts/get_accounts')(argv, taqz, 'username')
.then(async accounts => {
    for(n = 0; n < accounts.length; n++){
        const account = accounts[n]
        console.log(account)
        request.post('https://misskey.xyz/api/notes/timeline', {json: {i: account.i}}, (err, res, body) => {
            if(err) throw err
            else if (body.error) throw `Error: ${body.error}`
            else {
                console.log(body)
                body.reverse()
                for(i = 0; i < body.length; i++){
                    display.post(body[i])
                }
            }
        })

        const client = new websocket.client();

        client.on('connectFailed', function(error) {
            console.log('Connect Error: ' + error.toString());
        })

        client.on('connect', function(connection) {
            console.log('WebSocket Client Connected');
            connection.on('error', function(error) {
                console.log("Connection Error: " + error.toString());
            })
            connection.on('close', function() {
                console.log('echo-protocol Connection Closed');
            })
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    const data = JSON.parse(message.utf8Data)
                    if(data.type == 'note') display.post(data.body)
                }
            })

        })
        client.connect(`wss://misskey.xyz/?i=${account.i}`);
    }
})
.catch(err => { throw err })
