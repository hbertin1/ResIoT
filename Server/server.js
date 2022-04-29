const express = require('express');
const router = require('./router');
const ws = require('ws');
const {Led} = require('../Server/led.js');
const {Knx} = require('../Server/knx.js');
const { Chenillard } = require('./chenillard.js');


const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 8000;

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', function (data) {
    msg = JSON.parse(data.toString("utf8"))
    socket.send(Knx.toJSON())
    
    //Lors de la connection envoie des données de la knx
    setTimeout(() => { //fonction permettant de faire un temps d'arret 
      const end = process.hrtime.bigint()// prend le temps à la fin du timeout 
      const res = Number(end - start)*10e-6//calcul du temps écoulé + converstion en millisecondes
      console.log(`Temps écoulé ${res} millisecondes`)//affichage 
      Knx.changeState(3) //change l'état de la led 4
      socket.send(Knx.toJSON()) //envoie du JSON du KNX
    }, 5000); // temps d'attentes en nanosecondes  
    
    const start = process.hrtime.bigint(); // récupère le temps au début du programme 
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