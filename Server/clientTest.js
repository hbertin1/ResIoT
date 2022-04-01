const ws = require('ws');

const client = new ws('ws://localhost:8080');

client.on('open', () => {
    client.send(JSON.stringify({"connexion" : true}));
});

client.onmessage = function (data){
    data = JSON.parse(data.data)
    console.log(data)
}