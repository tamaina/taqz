const taqz = (function(){
    try{
        return require('./taqz.json')
    } catch(e) {
        throw Error('初期化されていません。 taqz misskey instance を実行し、初期化してください。')
    }
})()

console.log(`利用可能なアカウント(${taqz.accounts.length}) :\n`)

for(let i = 0; i < taqz.accounts.length; i++){
    console.log(`   ${taqz.accounts[i].name_domain}`)
}

console.log('\ntaqz misskey account でアカウントを追加できます。')