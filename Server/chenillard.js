class Chenillard{

    /**
     * Constructeur de la classe
     * @param {etat du chenillard} stateChe
     * @param {vitesses du chenillard} speed 
     * @param {direction du chenillar} direction 
     */
     constructor(stateChe, speed, direction){
        this.stateChe = stateChe;   //etat du chenillard (allumé ou éteint)
        this.speed = speed;         //Vitesse du chenillard
        this.direction = direction; //direction du chenillard (true = right, false = left)
    }

    /**
     * Modifie l'etat du chenillard
     * @param {etat de la LED} state 
     */
     setStateChe(stateChe) {
        this.stateChe = stateChe;
    }

    /**
     * @returns l'etat du chenillard
     */
    getStateChe(stateChe) {
        return this.stateChe = stateChe;
    }

    /**
     * Modifie la vitese du chenillard
     * @param {vitesse du chenillard} speed
     */
     setSpeed(speed) {
        this.speed = speed;
    }

    /**
     * 
     * @returns la vitesse du chenillard
     */
    getSpeed() {
        return this.speed;
    }

    /**
     * Modifie la direction du chenillard
     * @param {direction du chenillard} direction 
     */
     setDirection(direction) {
        this.direction = direction;
    }

    /**
     * @returns la direction du chenillard
     */
    getDirection(){
        return this.direction;
    }


    toJSON(){
        return JSON.stringify({"state" :this.stateChe, "speed" : this.speed, "direction": this.direction})
    }


}

//Exportation
module.exports = {Chenillard};