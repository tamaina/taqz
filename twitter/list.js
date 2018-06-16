const taqz = (function(){
    try{
        return require('./taqz.json')
    } catch(e) {
        throw Error('初期化されていません。 node twitter/init を実行し、初期化してください。')
    }
})()

console.log(`利用可能なアカウント(${taqz.accounts.length}) :\n`)

for(let i = 0; i < taqz.accounts.length; i++){
    console.log(`   ${taqz.accounts[i].screen_name}`)
}

console.log('\nnode twitter/account でアカウントを追加できます。')