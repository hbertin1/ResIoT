const express = require("express");
const { ReadableStreamBYOBRequest } = require("stream/web");
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
            console.log("On")
            response.send("Chenillard")
    })
    .get('/led', (request, response) => {
        if(request.query.signal === 'on'){
            switch (request.query.signal){
                case '1':
                    console.log("led1 ON")
                    break;
                case '2':
                    console.log("led2 ON")
                    break;
                case '3':
                    console.log("led3 ON")
                    break;
                case '4':
                    console.log("led4 ON")
                    break;
            }
        }
        else if(request.query.signal === 'off'){
            switch (request.query.signal){
                case '1':
                    console.log("led1 Off")
                    break;
                case '2':
                    console.log("led2 Off")
                    break;
                case '3':
                    console.log("led3 Off")
                    break;
                case '4':
                    console.log("led4 Off")
                    break;
                case 'All':
                    console.log("All led ")
                    break;
            }
        }
    })