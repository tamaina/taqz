const          util = require('util')
const     promisify = util.promisify
const            fs = require('fs')
const      minimist = require('minimist')
const       request = require('request')
const     websocket = require('websocket')

const readFile = promisify(fs.readFile)
const taqz = (function(){
    try{
        return require('./taqz.json')
    } catch(e) {
        throw Error('初期化されていません。 taqz misskey instance を実行し、初期化してください。')
    }
})()
if(taqz.accounts.length == 0) throw Error('アカウントがありません。taqz misskey account を実行し、アカウントを登録してください。')

const argv = minimist(process.argv.slice(1))

const getText = () => { return require('../scripts/get_text')(argv, taqz) }

(async () => {
    const accounts = await require('../scripts/get_accounts')(argv, taqz, 'name_domain')

    const _websockets = accounts.map((account, i, arr) => new Promise((res, rej) => {
        const client = new websocket.client();
    
        client.on('connectFailed', function(error) {
            console.log('Connect Error: ' + error.toString());
        })
    
        client.on('connect', function(connection) {
            console.log(`WebSocket Client Connected: ${account.domain}`);
            connection.on('error', function(error) {
                console.log("Connection Error: " + error.toString());
            })
            connection.on('close', function() {
                console.log('echo-protocol Connection Closed');
            })
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    const data = JSON.parse(message.utf8Data)
                    // console.log(data)
                }
            })

            res([client, connection])
        })

        client.connect(`wss://${account.domain}/streaming?i=${account.i}`);
    }))

    const websockets = await Promise.all(_websockets)

    return await getText().then(text => {
        return websockets.map(([client, connection]) => new Promise((res, rej) => {
            if (!connection.connected) res(null)
            const id = (new Date()).getTime().toString(36)
            console.log(id)
            connection.on('message', message => {
                if (message.type === 'utf8') {
                    const data = JSON.parse(message.utf8Data)
                    if (data.type === `api:${id}`) {
                        console.log(data)
                        res(data)
                    }
                }
            })
            const req = JSON.stringify({
                type: 'api',
                body: {
                    id,
                    endpoint: 'notes/create',
                    data: {
                        text
                    }
                }
            })
            console.log(req)
            connection.sendUTF(req)
        }))
    })
})()
