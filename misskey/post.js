const       request = require('request')
const taqz = (function(){
    try{
        return require('./taqz.json')
    } catch(e) {
        throw Error('初期化されていません。 taqz misskey instance を実行し、初期化してください。')
    }
})()
if(taqz.accounts.length == 0) throw Error('アカウントがありません。taqz misskey account を実行し、アカウントを登録してください。')

function post(argv){
    require('../scripts/get_accounts')(argv, taqz, 'name_domain')
    .then(async accounts => {
        const text = await require('../scripts/get_text')(argv, taqz)
        let arg = []
        for(n = 0; n < accounts.length; n++){
            const account = accounts[n]
            let json = {i: account.i, text: text}
            arg.push(new Promise(function(resolve, reject){
                request.post(`https://${account.domain}/api/notes/create`, {json: json}, (err, res, body) => {
                    if(err) reject(err)
                    if(body.error) reject(body.error)
                    else{
                        console.log(`\n✔ [Misskey]  投稿しました。 @${account.name_domain}`)
                        console.log(text)
                        resolve(text)
                    }
                })
            }))
        }
        return Promise.all(arg)
    })
    .catch(err => { throw err })
}
module.exports = post