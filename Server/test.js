const express = require('express');
const server = require('./server');
const wsServer = require('./serverWebsocket.js');

server()
wsServer()