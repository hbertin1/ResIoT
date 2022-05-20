const express = require('express');
const router = require('./router');
const ws = require('ws');
const { Led } = require('../Server/led.js');
const { Knx } = require('../Server/knx.js');
const { Chenillard } = require('./chenillard.js');
const knx =  require('./knx_monitor.js');


const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;
const wsServer = new ws.Server({ noServer: true });
knx.initWebSocket(wsServer);

wsServer.on('connection', socket => {
  socket.on('message', function (data) {
  })
});


app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(router); // Requests processing will be defined in the file router
app.listen(port, () => console.log('Server app listening on port ' + port));

const server = app.listen(3050);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

module.exports = {
  wsServer
};




