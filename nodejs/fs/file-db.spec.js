const path = require('path')
const { Database } = require('./file-db')

const client = new Database(path.resolve(__dirname, 'file.db'))

client.on('error', (err) => {
    console.log(err)
})

client.on('load', function () {
    const b = client.get('b')
    console.log('b value is', b)

    client.set('b', Date.now(), (err) => {
        if (err) {
            console.log(err.message)
            return 
        }
        console.log('write success')
    })

    client.del('a', (err) => {
        if (err) {
            console.log(err.message)
            return 
        }
        console.log('del success')
    })

    setTimeout(() => client.close(), 5000)
})

client.on('close', () => {
    console.log('关闭')
})