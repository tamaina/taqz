const       request = require('request')
const      inquirer = require('inquirer')
const      argv = process.argv.slice(1)
const taqz = (function(){
    try{
        return require('./taqz.json')
    } catch(e) {
        throw Error('初期化されていません。 node misskey/instance を実行し、初期化してください。')
    }
})()
if(taqz.accounts.length == 0) throw Error('アカウントがありません。node misskey/account を実行し、アカウントを登録してください。')

require('../scripts/get_accounts')(argv, taqz, 'name_domain')
.then(async accounts => {
    const text = await require('../scripts/get_text')(argv, taqz)
    const tags = await require('../scripts/get_tags')(argv, taqz)
    const coordinates = await getCoordinates()
    console.log(coordinates)
    const geo = {
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        coordinates: coordinates,
        heading: 0,
        speed: 0
    }
    let arg = []
    for(n = 0; n < accounts.length; n++){
        const account = accounts[n]
        let json = {i: account.i, text: text, geo: geo}
        if(tags != null) json.tags = tags
        arg.push(new Promise(function(resolve, reject){
            request.post('https://misskey.xyz/api/notes/create', {json: json}, (err, res, body) => {
                if(err) reject("サーバーはエラーを返しました: " + err)
                if(body.error) reject("サーバーはエラーを返しました: " + body.error)
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

async function getCoordinates(){

    const list = [
        {
            name: "東京ディズニーランド",
            value: [139.8794153, 35.633016]
        },
        {
            name: "新百合ヶ丘駅",
            value: [139.5076796, 35.6036226]
        },
        {
            name: "るなぱあく",
            value: [139.0630891, 36.3952957]
        },
        {
            name: "高崎白衣大観音",
            value: [138.98121, 36.310662]
        },
        {
            name: "建仁寺",
            value: [135.7671266, 34.9983637]
        },
        {
            name: "ひらかたパーク",
            value: [135.6374833, 34.8082552]
        },
        {
            name: "ユニバーサル・スタジオ・ジャパン",
            value: [135.4301495, 34.665442]
        },
        {
            name: "明石市立天文科学館",
            value: [135.001478, 34.649394]
        },
        {
            name: "原爆ドーム",
            value: [132.4514033, 34.395483]
        },
        {
            name: "種子島宇宙センター",
            value: [130.9552916, 30.3777776]
        },
        {
            name: "福岡・中洲",
            value: [130.405295, 33.593647]
        },
        {
            name: "ハウステンボス",
            value: [129.7850302, 33.0863476]
        }
    ]

    let form = [
        {
            type: 'list',
            name: 'coordinates',
            message: '場所を選択 :',
            choices: list
        }
    ]
    return inquirer.prompt(form)
    .then(as => as.coordinates)
}