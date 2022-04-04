const express = require('express');
const ws = require('ws');
const {Led} = require('../Server/led.js');
const {Knx} = require('../Server/knx.js');
const { Chenillard } = require('./chenillard.js');
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

    switch(msg.action){
        case "connexion" :
          console.log("Client connexion")
          socket.send(JSON.stringify({"action": "connexion", "ack" : true}))
          socket.send(knx.toJSON())
          break
        case "led":
          var changeLed = knx.getLed(msg.id)    //récupération de la led à modifier
          switch(msg.change){
            case "state":
              changeLed.setState(msg.state) //changement de l'état de la led
              break
            case "lum":
              changeLed.setLum(msg.lum)     //modification de la lumière de la led
              break
            case "color":
              changeLed.setColor(msg.color) //modification de la couleur de la led
              break
          }
          break
        case "chenillard":
          var chenillard = knx.getChenillard()
          console.log()
          switch(msg.change){
            case "stateChe":
              chenillard.setStateChe(msg.stateChe)       //Change l'etat du chenillard
              break
            case "speed":
              chenillard.setSpeed(msg.speed)          //Modifie la vitesse du chenillard
              break
            case "direction":
              chenillard.setDirection(msg.direction)  //Modifie le sense du chenillard
              break
          }
          break
    }
    
    
    //Lors de la connection envoie des données de la knx
    setTimeout(() => { //fonction permettant de faire un temps d'arret 
      const end = process.hrtime.bigint()// prend le temps à la fin du timeout 
      const res = Number(end - start)*10e-6//calcul du temps écoulé + converstion en millisecondes
      console.log(`Temps écoulé ${res} millisecondes`)//affichage 
      knx.changeState(3) //change l'état de la led 4
      socket.send(knx.toJSON()) //envoie du JSON du KNX
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