const urlServer = '//127.0.0.1:8000'

//const client = new ('//127.0.0.1:8000');
const axios = require('axios')
axios.get(`http://`+urlServer+`/chenillard?signal=`+ 'on')
        .then(response => (console.log(response)))
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    
/** 
const ws = require('ws');

const client = new ws('ws://localhost:8000');

client.on('open', () => {
    client.send(JSON.stringify({"action" : "led", "id":1, "change":"state", "state":true}));            //changement de l'état de la led
    client.send(JSON.stringify({"action" : "led", "id":2, "change":"lum", "lum":50}));                  //modification de la luminosité de la led
    client.send(JSON.stringify({"action" : "led", "id":3, "change":"color", "color":"red"}));           //modification de la couleur de la led
    client.send(JSON.stringify({"action" : "chenillard", "change" :"stateChe", "stateChe": true}));     //modification de l'etat du chenillard
    client.send(JSON.stringify({"action" : "chenillard", "change" :"speed", "speed": 5}));              //modification de la vitesse du chenillard
    client.send(JSON.stringify({"action" : "chenillard", "change" :"direction", "direction": false}));  //modification de la direction du chenillard
});

client.onmessage = function (data){
    data = JSON.parse(data.data)
    console.log(data)
}
*/