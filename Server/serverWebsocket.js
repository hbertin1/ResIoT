const express = require('express');
const ws = require('ws');
const {Led} = require('../Server/led.js');
const {Knx} = require('../Server/knx.js');
const knx = new Knx(4);

const start = process.hrtime.bigint(); // récupère le temps au début du programme 

const app = express();
console.log(knx)

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', function (data) {
    msg = JSON.parse(data.toString("utf8"))
    console.log("Connexion KNX " + msg.connexion)

    //Lors de la connection envoie des données de la knx
    socket.send(knx.toJSON());
    setTimeout(() => { //fonction permettant de faire un temps d'arret 
      const end = process.hrtime.bigint();// prend le temps à la fin du timeout 
      const res = Number(end - start)*10e-6;//calcul du temps écoulé + converstion en millisecondes
      console.log(`Temps écoulé ${res} millisecondes`);//affichage 
      knx.changeState(3); //change l'état de la led 4
      socket.send(knx.toJSON()); //envoie du JSON du KNX
    }, 5000); // temps d'attentes en nanosecondes  
    
    
  })

});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(8080);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});