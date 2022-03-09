// imports
const net = require('net');
const { stdin, stdout, env } = require('process');


var client = new net.Socket();

client.connect(8080, '127.0.0.1', function () {
    logStatus('Connected');
});

client.on('data', function (data) {
    dis = received.action(data);
});