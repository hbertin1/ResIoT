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

    chenillardKnx(device, action, state){
        console.log('test')
        return JSON.stringify({ "device" : device, "action": action, "state": state});
    }


}

module.exports = Json