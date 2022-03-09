const express = require("express");
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
        else
            console.log("off")
    })