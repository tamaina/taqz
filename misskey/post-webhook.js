const       request = require('request')
const       promisify = (require('util')).promisify
const       argv = require('minimist')(process.argv.slice(1))
console.log(argv)
require('../scripts/get_text')(argv).then(
async text => {
    return promisify(request.post)( (argv.r || argv.url) , {json: {text: text}})
    .then(res => {
        if (res.body.error || res.body.message) throw Error("サーバーはエラーを返しました: " + (res.body.error || res.body.message).toString())
        else {
            console.log(`\n✔ [Misskey]  投稿しました。`)
            console.log(text)
        }
    })
    .catch(e => {console.log(e)})
}).catch(e => {console.log(e)})