const service = process.argv[2]
if (service == 'post'){
    const inquirer = require('inquirer')
    const argv = require('minimist')(process.argv.slice(1))
    let taqz = {}, form = []

    try{
        taqz.misskey = require('./misskey/taqz.json')
        const choices = taqz.misskey.accounts.map(account => account['name_domain'])
        form.push({
            type: 'checkbox',
            name: 'misskey',
            message: `Misskey :`,
            choices: choices
        })
    } catch(e) {
        taqz.misskey = null
    }

    try{
        taqz.twitter = require('./twitter/taqz.json')
        const choices = taqz.twitter.accounts.map(account => account['screen_name'])
        choices.unshift({name: "None", value: null})
        console.log(choices)
        form.push({
            type: 'list',
            name: 'twitter',
            message: `Twitter :`,
            choices: choices
        })
    } catch(e) {
        taqz.twitter = null
    }

    try{
        taqz.mstdn = require('./mstdn/taqz.json')
        const choices = taqz.mstdn.accounts.map(account => account['id'])
        form.push({
            type: 'checkbox',
            name: 'mstdn',
            message: `Mastodon :`,
            choices: choices
        })
    } catch(e) {
        taqz.mstdn = null
    }

    if(!argv.t){
        form.push({
            type: 'edit',
            name: 'text',
            message: 'Text to post :'
        })
    }
    return inquirer.prompt(form).then(as => {
        if(as.misskey && as.misskey.length > 0) require('./misskey/post' )({ n: as.misskey.join(','), text: ( as.text || argv.t ) })
        if(as.twitter && as.twitter != null) require('./twitter/tweet')({ n: as.twitter, t: ( as.text || argv.t ) })
        if(as.mstdn   && as.mstdn.length   > 0) require('./mstdn/toot'   )({ n: as.mstdn.join(','),   t: ( as.text || argv.t ) })
    })

} else if (service == 'help'){
    console.log(`Usage:
    taqz <service> <command>
    taqz post

    <services>
    misskey, twitter, mastodon(mstdn)

    <commands>
    help, post, etc...
    `)

} else if (!(service == 'twitter' || service == 'misskey' || service == 'mstdn' || service == 'mastodon')){
    console.log('Incorrect Service Name')
    return false

} else {
    return require(`./${service == 'mastodon' ? 'mstdn' : service}${process.argv[3] ? `/${process.argv[3]}` : ""}`)
}