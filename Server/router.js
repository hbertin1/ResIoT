const express = require("express");
//const { ReadableStreamBYOBRequest } = require("stream/web");
const router = express.Router();
const ws = require('ws');
const { Led } = require('../Server/led.js');
const { Knx } = require('../Server/knx.js');
const { Chenillard } = require('./chenillard.js');
const knx = new Knx(4); //création du knx virtuel 
const wsServer = require('./serverWebsocket.js');

module.exports = router;

router
    .get('/', (request, response) => {
        response.send('Bonjour')
    })
    .get('/demo', (request, response) => {
        response.send('Bonjour je suis la démo')
    })
    .get('/knx', (request, response) => {
        response.redirect('http://localhost:3000/')
    })
    .get('/chenillard', (request, response) => {        //Réception des commandes sur le chenillard
        var chenillard = knx.getChenillard();
        switch (request.query.signal) {
            case 'on':
                if (!chenillard.getStateChe()) {        //Chenillard eteint
                    chenillard.setStateChe(true);    //Chenillard eteint donc on allume

                    //Envoyé la réponse en webSocket
                    response.send('Ack Chenillard on : ' + chenillard.getStateChe())    //Envoie d'un message d'ACK au client
                }
                //Si le chenillard non allumé on ne peut pas modifier ses différents paramètres
                var speedChe = request.query.speed;         //Vitesse du chenillard           
                if (speedChe != chenillard.getSpeed()) {    //Verification de la vitesse du chenillard
                    chenillard.setSpeed(speedChe);          //Modification de la vitesse du chenillard
                }
                var directionChe = request.query.direction;         //direction du chenillard (true = right, false = left)                
                if (directionChe != chenillard.getDirection()) {    //Verification de la direction du chenillard
                    chenillard.setDirection(directionChe);          //Modification de la direction du chenillard
                }
                break;
            case 'off':
                if (chenillard.getStateChe) {         //Chenillard allumé
                    chenillard.setStateChe(false);    //Chenillard eteint donc on allume
                    response.send('Ack Chenillard on : ' + chenillard.getStateChe())    //Envoie d'un message d'ACK au client
                }
                break;
        }  
    })
    .get('/led', (request, response) => {                   //Réception des commandes sur les Leds
        if (request.query.signal === 'on') {                //Signal pour allumé la led
            knx.getLed(request.query.id).setState(true)     //Récupération de l'id de la Led pour l'allumé 
            console.log('Led' + request.query.id + ' ON')   
            response.send("Ack Led ON")    //Envoie d'un message d'ACK au client
            wsServer.send("test")
        }
        else if (request.query.signal === 'off') {          //Signal pour éteindre la led
            knx.getLed(request.query.id).setState(false)    //Récupération de l'id de la Led pour l'éteindre  
            console.log('Led' + request.query.id + ' OFF')
            response.send("Ack Led OFF")                    //Envoie d'une message d'ACK au client
        }
       
    })
    console.log(knx)