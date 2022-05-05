const {Led} = require('../Server/led.js');
const {Chenillard} = require('../Server/chenillard.js');

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
        this.chenillard = new Chenillard(false, 1, true);
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
     * retourne la led correspondante
     * @param {nombre de LED} numberLed
     */
      getLed(numberLed){
        return this.knx[numberLed-1];
    }

    /**
     * Retourne le nombre de la de la knx
     */
    getNumberLed(){
        return this.numberLed;
    }

    /**
     * @returns chenillard 
     */
     getChenillard(){
        return this.chenillard;
    }

    toJSON(){
        return JSON.stringify({"knx" : this.knx, "numberLed": this.numberLed, "chenillard": this.chenillard});
    }


    changeState(numberOfLed){
        this.knx[numberOfLed].setState();
    }
}

//Exportation
module.exports = {Knx};