const express = require("express");
//const { ReadableStreamBYOBRequest } = require("stream/web");
const router = express.Router();
const ws = require('ws');
const { Led } = require('../Server/led.js');
const { Knx } = require('../Server/knx.js');
const { Chenillard } = require('./chenillard.js');
const knx = new Knx(4); //création du knx virtuel 

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
    .get('/chenillard', (request, response) => {
        var chenillard = knx.getChenillard();
        switch (request.query.signal) {
            case 'on':
                console.log(knx)
                console.log(knx.getChenillard().getStateChe())
                if (!chenillard.getStateChe()) {        //Chenillard eteint
                    chenillard.setStateChe(true);    //Chenillard eteint donc on allume
                    response.send('Ack Chenillard on : ' + chenillard.getStateChe())
                }
                //Si le chenillard non allumé on ne peut pas modifier ses différents paramètres
                var speedChe = request.query.speed;     //Vitesse du chenillard           
                if (speedChe != chenillard.getSpeed()) {  //Verification de la vitesse du chenillard
                    chenillard.setSpeed(speedChe);      //Modification de la vitesse du chenillard
                }
                var directionChe = request.query.direction; //direction du chenillard (true = right, false = left)                
                if (directionChe != chenillard.getDirection()) {  //Verification de la direction du chenillard
                    chenillard.setDirection(directionChe);      //Modification de la direction du chenillard
                }
                break;
            case 'off':
                if (chenillard.getStateChe) {         //Chenillard allumé
                    chenillard.setStateChe(false);    //Chenillard eteint donc on allume
                    response.send('Ack Chenillard on : ' + chenillard.getStateChe())
                }
                break;
        }  
    })
    .get('/led', (request, response) => {
        if (request.query.signal === 'on') {
            console.log('Led' + request.query.number + ' ON')
            response.send("Ack Led ON")
        }
        else if (request.query.signal === 'off') {
            console.log('Led' + request.query.number + ' OFF')
            response.send("Ack Led OFF")
        }
    })
