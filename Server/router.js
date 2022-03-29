const express = require("express");
//const { ReadableStreamBYOBRequest } = require("stream/web");
const router = express.Router();
const urlServer = '127.0.0.1:8080'

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
        if(request.query.signal === 'on')
            console.log("Chenillard On")
            response.send("Ack Chenillard")
    })
    .get('/led', (request, response) => {
        if(request.query.signal === 'on'){
            console.log( 'Led' + request.query.number + ' ON')
            response.send("Ack Led ON")
        }
        else if(request.query.signal === 'off'){
            console.log( 'Led' + request.query.number + ' OFF')
            response.send("Ack Led OFF")
        }
    })