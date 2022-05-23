# ResIoT
Le projet a pour objectif de contrôler des LEDS d'une maquette KNX à partir d'un site web afin de reproduire un chenillard. KNX est un standard de communication notamment dans la domotique, permettant de contrôler tous types d'objets dans une maison tel que des lumières, des volets et différents types de capteurs. 
Dans ce projet il est possible :    
                - D'allumer et éteindre les LEDS individuellement à partir du site web. 
                - De lancer et de stopper un chenillard.
                - De choisir différents motifs de chenillard.
                - De changer le sens du chenillard. 
                - De modifier la vitesse du chenillard.
                - De contrôler le chenillard à partir des boutons de la maquette KNX.  

# Pré-requis
Le projet nécessite un compteur électrique avec le standard KNX et d'une passerelle Wi-Fi. De plus, plusieurs LEDS doivent être reliées à ce compteur ainsi que des interrupteurs. La passerelle Wi-Fi et le serveur doivent être sur le même réseau afin de pouvoir communiquer.  

# Installation 
Il est nécessaire de télécharger l'ensemble fichiers du projet. Plusieurs modules devront être à télécharger tel que react, yarn, NodeJs ou encore knx. 

# Lancement du serveur et du site web
Le serveur se lance par la commande **node server.js** dans le dossier Serveur. Le site web s'exécute par la commande **yarn start** dans le dossier Client. La page web se trouve sur le localhost port 3000.

# Utilisation du site web
Lorsque vous êtes sur le site web, vous vous retrouvez 4 leds, et 4 boutons en dessous des leds. Les boutons permettent d'allumer individuellement chaque led. Lorsque le bouton est marqué **start** la led est éteinte, et **stop** lorsqu'elle est allumée. S'il y a une déconnexion avec le serveur, les boutons sont marqués **Disconnected**. Le reste des éléments de la page web correspondent au contrôle du chenillard. On retrouve une slide barre permettant de gérer la vitesse du chenillard en fonction de la valeur de cette dernière que l'on peut régler en faisant glisser la barre, en cliquant dessus ou en changeant la valeur à gauche. On retrouve ensuite une liste déroulante permettant de choisir le motif du chenillard. Il est nécessaire d'arrêter et de redémarrer le chenillard pour appliquer le changement de motif. Le démarrage du chenillard par un bouton marqué **Start the Chenillard** lorsqu'il est éteint et **Stop the Chenillard** lorsqu'il est allumé. Il reste un dernier bouton, permettant le changement de sens du chenillard, marqué par le sens appliqué sur le chenillard. Il peut être utilisé lorsque le chenillard est en marche.    

# Utilisation de la maquette KNX
Dans ce projet il est possible de commander les leds directement sur la maquette KNX à partir d'interrupteurs. Ils permettent de lancer ou d'arrêter le chenillard, de changer le sens du chenillard, d'accélérer sa vitesse et la ralentir pour le dernier.  

# Architecture du Back End

# Architecture du Front End

# Auteurs
Le projet a été réalisé dans le cadre du module RESIoT de la deuxième année de l'ESIR, option IoT. 
Réalisé par :
    **Hugo Bertin** <!---->
    **Adrien Bodin**



Encadré par :
    **Elyes Cherfa**
    **Johann Bourcier** 