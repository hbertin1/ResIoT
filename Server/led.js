const { json } = require("express");

class Led{

    /**
     * Constructeur de la classe
     * @param {etat de la LED} state 
     * @param {luminosité de la LED} lum 
     * @param {couleur de la LED} color 
     */
     constructor(state, lum, color, id){
        this.state = state; //etat de la LED (allumé ou éteint)
        this.lum = lum;     //Luminosité de la LED
        this.color = color; //Couleur de la LED
        this.id = id;       //id de la led
    }

    /**
     * Modifie l'etat de la LED
     * @param {etat de la LED} state 
     */
     setState() {
        this.state = !this.state;
    }

    /**
     * 
     * @returns l'etat de la LED
     */
    getState(state) {
        return this.state = state;
    }

    /**
     * Modifie la luminosité de la LED
     * @param {luminosité de la LED} lum 
     */
     setLum(lum) {
        this.lum = lum;
    }

    /**
     * 
     * @returns la luminosité de la LED
     */
    getLum() {
        return this.lum;
    }

    /**
     * Modifie l'ID de la LED
     * @param {ID de la LED} id 
     */
     setID(id) {
        this.id = id;
    }

    /**
     * 
     * @returns l'ID de la LED
     */
    getID() {
        return this.id;
    }

    /**
     * Modifie la couleur de la LED
     * @param {couleur de la LED} color 
     */
     setColor(color) {
        this.color = color;
    }

    /**
     * 
     * @returns la couleur de la LED
     */
    getColor() {
        return this.color;
    }

    toJSON(){
        return JSON.stringify({"id" : this.id, "state" :this.state, "lum" : this.lum, "color": this.color})
    }


}

//Exportation
module.exports = {Led};