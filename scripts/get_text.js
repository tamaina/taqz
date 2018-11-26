const fileExists = require('file-exists')
const   inquirer = require('inquirer')
const readFile = (require('util').promisify)(require('fs').readFile)

async function get_text(argv, taqz){
    if ( argv.file === true || argv.path === true || argv.f === true || argv.text === true || argv.body === true || argv.t === true || argv.s === true ) return ''
    else if ( argv.file && fileExists(argv.file) ) return readFile(argv.file, 'utf8')
    else if ( argv.path && fileExists(argv.path) ) return readFile(argv.path, 'utf8')
    else if ( argv.f && fileExists(argv.f) ) return readFile(argv.f, 'utf8')
    else if ( argv.text ) return argv.text.replace(/\\n/g, '\n')
    else if ( argv.body ) return argv.body.replace(/\\n/g, '\n')
    else if ( argv.t ) return argv.t.replace(/\\n/g, '\n')
    else if ( argv.s ) return argv.s.replace(/\\n/g, '\n')
    else {
        let form = [
            {
                type: 'edit',
                name: 'text',
                message: '本文 :'
            }
        ]
        return inquirer.prompt(form)
        .then(as => {
            return as.text.replace(/\\n/g, '\n')
        })
        .catch(err => { throw err })
    }
}

module.exports = get_text