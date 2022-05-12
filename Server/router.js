// const knx =  require('./knx_monitor.js');
const express = require("express");
//const { ReadableStreamBYOBRequest } = require("stream/web");
const router = express.Router();
const ws = require('ws');
const { Led } = require('../Server/led.js');
const { Chenillard } = require('./chenillard.js');
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
        switch (request.query.signal) {
            case 'on':
                // knx.startStopChenillard();
                //Si le chenillard non allumé on ne peut pas modifier ses différents paramètres
                var speedChe = request.query.speed;                 //Vitesse du chenillard           
                var directionChe = request.query.direction;         //direction du chenillard (true = right, false = left)
                break;
            case 'off':
                // knx_t.startStopChenillard();
                break;
        }  
    })
    .get('/led', (request, response) => {                   //Réception des commandes sur les Leds
        switch (request.query.signal) {   
            case 'on':             //Signal pour allumé la led
                console.log('Led' + request.query.id + ' ON')   
                response.send("Ack Led ON")    //Envoi d'un message d'ACK au client
                // wsServer.send("test")
                break;
            
            case 'off': //Signal pour éteindre la led
                console.log('Led' + request.query.id + ' OFF')
                response.send("Ack Led OFF")    //Envoi d'une message d'ACK au client
                break;
        }
    })