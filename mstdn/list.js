const taqz = (function(){
    try{
        return require('./taqz.json')
    } catch(e) {
        throw Error('初期化されていません。 node mstdn/instance を実行し、初期化してください。')
    }
})()

console.log(`利用可能なアカウント(${taqz.accounts.length}) :\n`)

for(let i = 0; i < taqz.accounts.length; i++){
    console.log(`   ${taqz.accounts[i].id}`)
}

console.log('\nnode mstdn/account でアカウントを追加できます。')