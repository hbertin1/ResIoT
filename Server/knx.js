const {Led} = require('../Server/led.js');

const start = process.hrtime.bigint(); // récupère le temps au début du programme 

class Knx{

    /**
     * Constructeur de la classe
     * @param {nombre de LED} numberLed
     */
     constructor(numberLed){
        this.knx = [];       //tableau contenant les leds
        this.numberLed = numberLed;
        this.addLed(this.numberLed);    //ajout des led dans le tableau

    }

    /**
     * Ajout un nombre de led au KNX
     * @param {nombre de LED} numberLed
     */
    addLed(numberLed){
        var cmpt =0;
        while(cmpt<numberLed){
            cmpt++;
            var led = new Led(true, 100, 'white', cmpt);
            this.knx.push(led);
        }
        console.log(this.knx)
    }

    /**
     * Retourne le nombre de la de la knx
     */
    getNumberLed(){
        return this.numberLed;
    }

    /**
     * Chenillard
     * @param {LED} led
     * @param {nombre de LED} numberLed
     */
    chenillard(state, speed){

    }

    toJSON(){
        return JSON.stringify({"knx" : this.knx, "numberLed": this.numberLed});
    }


    changeState(numberOfLed){
        this.knx[numberOfLed].setState();
    }
}

//Exportation
module.exports = {Knx};