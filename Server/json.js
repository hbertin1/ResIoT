const {Led} = require('../Server/led.js');
const {Knx} = require('../Server/knx.js');
const { Chenillard } = require('./chenillard.js');

class Json {
    constructor() { }

    connexionAck(ack){
        return JSON.stringify({ "action": "Connexion", "ack": ack});
    }

    sendKnx(){
        return Knx.toJson()
    }

    sendLed(){
        return Led.toJson()
    }

    sendChenillard(){
        return Chenillard.toJson()
    }


}

module.exports = Json