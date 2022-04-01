const WebSocket = require('ws')
const store = require('store')


const urlServer = 'ws://127.0.0.1:8000'

const client = new WebSocket(urlServer)

client.on('open', () => {
    client.send('test connard')
})

client.onmessage = function (event) {
    // on recoit un json
    console.log(event)
    switch (event) {
        case 'running':

        break;
        case 'stoped':

        break;
    }
}


