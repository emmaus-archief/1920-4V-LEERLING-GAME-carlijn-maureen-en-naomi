/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

var SPEELVELDHOOGTE; // declareert hoogte van het speelveld
var SPEELVELDBREEDTE; // declareert breedte van het speelveld

const BEGIN = 0; //constante voor beginscherm
const UITLEGBEWEGEN1 = 1; // constante voor tweede beginscherm
const UITLEGBEWEGEN2 = 2; // constante voor derde beginscherm
const UITLEGSCHIETEN = 3; // constante voor vierde beginscherm
const UITLEGVERHAAL = 4; // constante voor vijfde beginscherm
const SPELEN = 5; // constante voor het begin van het spel
const GAMEOVER = 6; // constante voor game-over scherm
const LEVEL1 = 7; //constante voor level 1 scherm
const LEVEL2 = 8; // constante voor level 2 scherm
const LEVEL3 = 9; // constante voor level 3 scherm
const LEVEL4 = 10; // constante voor level 4 scherm
const LEVEL5 = 11; // constante voor level 5 scherm

var level = 0; // variabele voor levels
var score = 0; // variabele voor scores
var aantalLevens = 3; // variabele voor aantal levens

var spelStatus = BEGIN; // variabele voor spelstatus

var stopwatchMiliSec = 0; // variabele timer milisec
var stopwatchSec = 0; // variabele timer sec
var stopwatchMin = 0; // variabele timer min

var spelerX = 0; // x-positie van speler
var spelerY = 650; // y-positie van speler

//var isKogelZichtbaar = false; //geeft aan waneer de kogel te zien is
var kogelsX = [];    // x-positie van kogels
var kogelsY = [];    // y-positie van kogels
var kogelTimer = 0;

var vijandenX = [];   // x-positie van vijand
var vijandenY = [];   // y-positie van vijand
var vijandenSnelheid = []; //de snelheid van de vallende vijanden
var vijandYSnelheid = -2; // verticale snelheid van de vijanden
var minimaleSnelheidVijand = 2; // minimale snelheid van de vijanden wat per level hoger wordt
var maximaleSnelheidVijand = 6; // maximale snlehied vijanden wat per level hoger wordt

var visX = 540; // x plaats van die vissen die levens aangeven op x-as
var visY = 5; // y plaats van die vissen die levens aangeven op y-as
var visGrootte = 80; // hoe breed en hoog de vissen zijn


// alle afbeeldingen
var plaatje; // declareert afb. achtergrond
var plaatjeSpeler; // declareert afb. speler
var plaatjeVijandEen; // declareert afb. vijand 1
var plaatjeKogel; // declareert afb. kogel
var plaatjeMoveHere; // declareert afb. move here blokje
var plaatjeShootHere; // declareert afb. shoot here blokje
var plaatjeSpaceShip; // declareert afb. die wordt gebruikt als achtergrond bij verhaal
var plaatjeLevendeVis; // declareert afb. levende vis die wordt gebruikt bij de levens
var plaatjeDodeVis; // declareeert afb. dode vis die wordt gebruikt bij de levens
var naamGame; // declareert afb. naam game op beginscherm
var textMoveMouse; // declareert afb. move your mouse to move
var textPressShoot; // declareert afb. press space to shoot
var textVerhaal; // declareert afb. met het verhaal
var plaatjeGameOver; // declareert afb. scerm game over
var plaatjeLevel1; // declareert afb. level 1
var plaatjeLevel2; // declareert afb. level 2
var plaatjeLevel3; // declareert afb. level 3
var plaatjeLevel4; // declareert afb. level 4
var plaatjeLevel5; // declareert afb. level 5

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


function preload() {
    plaatje = loadImage('plaatjes/achtergrondStad.jpg') //preload afb. achtergrond
    plaatjeSpeler = loadImage('plaatjes/playerKat2.png') // preload afb. speler
    plaatjeVijandEen = loadImage('plaatjes/vijand-1.png') // preload afb. vijand
    plaatjeKogel = loadImage('plaatjes/kogel.png') // preload afb. kogel
    plaatjeMoveHere = loadImage('plaatjes/move-here.jpg') //preload afb. move-here
    plaatjeShootHere = loadImage('plaatjes/shoot-here.jpg')// preload afb. shoot-here
    plaatjeSpaceShip = loadImage('plaatjes/binnenSpaceShip.jpg') // preload afb. uitlegverhaal-scherm
    plaatjeLevendeVis = loadImage('plaatjes/vis.PNG') //preload afb. vis/levens
    plaatjeDodeVis = loadImage('plaatjes/dodeVis.PNG') // preload afb. dode vis/ levens die je niet meer hebt
    naamGame = loadImage('plaatjes/naamGame.PNG') // preload afb. naam game
    textMoveMouse = loadImage('plaatjes/text-move-mouse.PNG') // preload afb. move-mouse
    textPressShoot = loadImage('plaatjes/press-space.PNG') // preload afb. press space
    textVerhaal = loadImage('plaatjes/text-verhaal.PNG') //preload afb. text-verhaal
    plaatjeGameOver = loadImage('plaatjes/game-over.jpg') // preload afb. game-over
    plaatjeLevel1 = loadImage('plaatjes/level1.jpg') //preload afb. level 1
    plaatjeLevel2 = loadImage('plaatjes/level2.jpg') // preload afb. level 2
    plaatjeLevel3 = loadImage('plaatjes/level3.jpg') //preload afb. level 3
    plaatjeLevel4 = loadImage('plaatjes/level4.jpg') // preload afb. level 4
    plaatjeLevel5 = loadImage('plaatjes/level5.jpg') // preload afb. level 5

}

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  
    fill('pink'); // laat dit staan, anders werkt het niet
  image(plaatje, 0, 0, width + 50, height + 50); // is de achtergrond, '+ 50' zodat de lelijke onderkant er niet op komt
  //rect(20, 20, width - 2 * 20, height - 2 * 20); // voor het geval dat we weer een roze achtergrond willen
};

/*
Hier staan alle plaatjes en tekst die moeten worden getekend op het allereerste scherm
*/
var tekenBeginScherm = function () {
    //afbeeldingen:
    image(plaatjeSpeler, 80, 300, 250, 250); // afb. speler
    image(plaatjeVijandEen, 1000, 100, 150, 150); // afb. vijand
    image(plaatjeKogel, 900, 400, 90, 180); // afb. kogel
    image(naamGame, 150, -50, 1000, 400);// afb. game
        
    // tekst en vormen:

    fill(240, 240, 240);
     if ( mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) {
            fill(150, 150, 150);
     }   
    noStroke();
    rect(300, 600, 750, 50); //rechthoek waar je om moet klikken om te beginnen

    fill(0, 0, 0);
    textSize(30);
    text("click here to start!", 560, 610, 550, 700); // text in rechthoek
}

// Dit zijn de afbeeldingen die op het tweede scherm moet komen, het scherm waar je beweegt
var tekenUitlegBewegenScherm = function (plaatjeX, plaatjeY) {
    image(textMoveMouse, 150, -50, 1000, 400);
    image(plaatjeMoveHere, plaatjeX, plaatjeY, 100, 100)
}

//Dit zijn de afbeeldingen die op het derde scherm moeten komen, het scherm waar je schiet
var tekenUitlegSchietenScherm = function (){
    image(textPressShoot, 150, -50, 1000, 400);
    image(plaatjeShootHere, 400, 200, 100, 100);
}

var tekenUitlegVerhaalScherm = function () {
    fill('pink'); // laat dit staan, anders werkt het niet
    image(plaatjeSpaceShip, 0, 0, width + 50, height + 50); // is de achtergrond, '+ 50' zodat de lelijke onderkant er niet op komt

    image(textVerhaal, 250, 100, 800, 500); //afb tekst verhaal
}

var tekenGameOverScherm = function (){
    image(plaatjeGameOver, 0, 0, width + 50, height + 50); // tekent afb. game-over

    fill(140, 140, 140);
    if ( mouseX > 300 && mouseX < 1050 && mouseY > 400 && mouseY < 450) { 
            fill(200, 200, 200);
     }   
    noStroke();
    rect(300, 400, 750, 50); //rechthoek waar je om moet klikken om te beginnen

    fill(0, 0, 0);
    textSize(30);
    text("click here to restart!", 550, 410, 550, 700); // text in rechthoek

    //Deze code is nodig om de timer goed op het eindscherm te hebben
    var extraNul1 = "";
    var extraNul2 = "";
    if (stopwatchMiliSec < 10) {
        extraNul1 = "0";
    }
    if (stopwatchSec < 10) {
        extraNul2 = "0";
    }

    var timerString = stopwatchMin + " : " + extraNul2 + stopwatchSec + " : " + extraNul1 + stopwatchMiliSec; // zorgt dat de timer erop staat + leestekens
    textSize(25);
    text(("Score: "+ score + "\nLevel: " + level + "\nTime: " + timerString), 400, 250, 600, 600);
}

var tekenLevelScherm = function (naam) { // tekent het scherm tussen de levels
    image(naam, 0, 0, width + 50, height + 50);

    fill(240, 240, 240); 
     if ( mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) {
            fill(150, 150, 150);
     }   
    noStroke();
    rect(300, 600, 750, 50); //rechthoek waar je om moet klikken om te beginnen

    fill(0, 0, 0);
    textSize(30);
    text("click here to go on!", 560, 610, 550, 700); // text in rechthoek
}

/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function() {
    for (var i = 0; i < vijandenX.length; i++) {
        //fill('blue');
        image(plaatjeVijandEen, vijandenX[i], vijandenY[i], 60, 60);
        //ellipse(vijandenX[i], vijandenY[i], 35, 35);

    }

};



 // Tekent de kogel 
 
var tekenKogels = function() {
  for(var i = 0; i < kogelsX.length; i++) {
    image(plaatjeKogel, kogelsX[i], kogelsY[i], 30, 60);
  }

};

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill('white'); // laat dit staan, anders werkt het niet
  image(plaatjeSpeler, mouseX, spelerY - 100, 150, 150); // afbeelding speler >>> spelerY - 100 omdat het anders onder het scherm komt
  
}
// tekent de score (hoeveel punten je hetb)

function tekenScore() {
    fill(7, 87, 217);  
    rect(25, 15, 150, 50); 

    fill(255, 255, 255);
    textSize(24);
    text("Score: "+score , 50, 30, 150, 100);
}


// tekent in welk level je zit
function tekenLevel() {
    fill(7, 87, 217);  
    rect(300, 15, 150, 50); 

    fill(255, 255, 255);
    textSize(24);
    text("Level: "+level , 325, 30, 150, 100);
}

// hier wordt de timer getekend
function tekenTimer() {
    var extraNul1 = "";
    var extraNul2 = "";

    if (stopwatchMiliSec < 10) {
        extraNul1 = "0";
    }
    if (stopwatchSec < 10) {
        extraNul2 = "0";
    }

    var timerString = stopwatchMin + " : " + extraNul2 + stopwatchSec + " : " + extraNul1 + stopwatchMiliSec;
    
    textSize(20);
    text(timerString , SPEELVELDBREEDTE - 80, 30, 100, 50); // speelveldbreedte - 80 zodat het net langs de rechterkant staat
}

// tekent (in visjes) hoeveel levens je nog hebt
function tekenLevens() {
        image(plaatjeLevendeVis, visX, visY, visGrootte, visGrootte);

    if (aantalLevens === 3) {
        image(plaatjeLevendeVis, visX + visGrootte, visY, visGrootte, visGrootte);
        image(plaatjeLevendeVis, visX + 2*visGrootte, visY, visGrootte, visGrootte);
    }
    if (aantalLevens === 2) {
        image(plaatjeLevendeVis, visX + visGrootte, visY, visGrootte, visGrootte);
        image(plaatjeDodeVis, visX + 2*visGrootte, visY, visGrootte, visGrootte);
    }
    if (aantalLevens === 1) {
        image(plaatjeDodeVis, visX + visGrootte, visY, visGrootte, visGrootte);
        image(plaatjeDodeVis, visX + 2*visGrootte, visY, visGrootte, visGrootte);
    }
}


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    for (var i = 0; i < vijandenX.length; i++) {
        vijandenY[i] = vijandenY[i] + vijandenSnelheid[i];

        if (vijandenY[i] > SPEELVELDHOOGTE + 20) {
            vijandenY[i] = random(-100, -30);
            vijandenX[i] = random(20, SPEELVELDBREEDTE - 20);
            vijandenSnelheid[i] = random(minimaleSnelheidVijand, maximaleSnelheidVijand);
       }
    }
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {
  if (kogelTimer > 0) {
    kogelTimer--;
  }
  
  if (keyIsPressed === true) { // met spatie schiet je de kogel
      if (key === " " && kogelTimer === 0) {
          kogelsX.push(mouseX + 140);
          kogelsY.push(spelerY - 45);
          kogelTimer = kogelTimer + 100;
      }
  }

  for(var i = 0; i < kogelsX.length; i++) {
    kogelsY[i] = kogelsY[i] - 3;  
  }

  if (kogelsY < -60) {
      verwijderKogel(); // Als de kogel uit het beeld is, wordt die verwijdert
  }

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {

};

function verwijderKogel(nummer) { // verwijderd de kogel als het iets raakt/uit beeld gaat
    kogelsX.splice(nummer, 1);
    kogelsY.splice(nummer, 1);
}

function verwijderVijand(nummer) { // verwijderd de vijand als het iets raakt/ uit beeld gaat
    vijandenX.splice(nummer, 1);
    vijandenY.splice(nummer, 1)
}

function maakNieuweVijand() { // zorgt dat er een nieuwe vijand in beeld komt als er eentje wordt verwijderd
    vijandenX.push(random(20, SPEELVELDBREEDTE - 20));
    vijandenY.push(random(-250, -30));
    vijandenSnelheid.push(random(2, 10));
}


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
/*
var checkVijandGeraakt = function() {

  return false;
};

*/ 

/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */

var checkVijandGeraakt = function(vijandNummer) { // controleert of de vijand is geraakt
  var teruggeefWaarde = false;


  for(var i = 0; i < kogelsX.length; i++) {
    if (collideRectRect(kogelsX[i], kogelsY[i], 30, 60, vijandenX[vijandNummer], vijandenY[vijandNummer], 60, 60)) { // checkt of vijand en kogel elkaar raken
        teruggeefWaarde = true;
        
         
        // verwijder de kogel die de vijand raakt
        verwijderKogel(i);
    }
  }


    return teruggeefWaarde;
};

/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function(vijandNummer) {
    var teruggeefWaarde = false;
    
    
        if (collideRectRect(vijandenX[vijandNummer], vijandenY[vijandNummer], 60, 60, mouseX, spelerY,  150, 150)) { 
            //kijkt of vijand en speler elkaar raken
        teruggeefWaarde = true;
        }
    
    return teruggeefWaarde;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
  var teruggeefWaarde = false;
  if (aantalLevens === 0) {
      teruggeefWaarde = true;
  }
    
  return teruggeefWaarde;
};


// deze functie zorgt ervoor dat de timer gaat lopen
function timerLoopt() {
    stopwatchMiliSec++;

    if (stopwatchMiliSec == 60) { //zorgt dat na 60 miliseconde er 1 seconde bij komt
        stopwatchSec++;
        stopwatchMiliSec = 0;
    }
    if (stopwatchSec == 60) { // zorgt dat er na 60 seconde 1 minuut bijkomt
        stopwatchMin++;
        stopwatchSec = 0;
    }
}


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin het spel wordt getekend
  createCanvas(1280, 720);

  // Kleur de achtergrond niet, maar anders werkt het niet
  background('grey');

  SPEELVELDHOOGTE = height - 2 * 20; // hoogte speelveld
  SPEELVELDBREEDTE = width - 2 * 20; // breedte speelveld



  for (var i = 0; i < 5; i++) { 
    vijandenX.push(random(20, 1220)); // zorgt dat de vijand in beeld komt op een random x positie
    vijandenY.push(random(-250, -30)); // zorgt dat de vijand in beeld komt op een random y positie boven het scherm zodat de vijanden niet allemaal tegelijk in het beeld komen
    vijandenSnelheid.push(random(minimaleSnelheidVijand, maximaleSnelheidVijand)); // zorgt dat de snelheid van de vijanden willeukeurig is
  }
  
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case BEGIN: // beginscherm met titel en plaatjes
        tekenVeld(); //achtergrond
        tekenBeginScherm ();

        if ( mouseIsPressed === true && mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) { // als je op deze knop drukt ga je naar het volgende scherm
            spelStatus = UITLEGBEWEGEN1; // zorgt dat je naar het volgende scherm gaat
        }

    break;
    case UITLEGBEWEGEN1: // interactief beginscherm dat uitlegt hoe je moet bewegen
        tekenVeld();
        tekenUitlegBewegenScherm(1000, 590);
        beweegSpeler();
        tekenSpeler(spelerX, spelerY);

        if (mouseX > 970 && mouseX < 1101) { // als je met je muis in dit vierkant gaat ga je naar het volgende scherm
            spelStatus = UITLEGBEWEGEN2; // zorgt dat je naar het volgende scherm gaat
        }

    break;
    case UITLEGBEWEGEN2: // interactief beginscherm dat uitlegt hoe je moet bewegen
        tekenVeld();
        tekenUitlegBewegenScherm(300, 590);
        beweegSpeler();
        tekenSpeler(spelerX, spelerY);

        if (mouseX > 270 && mouseX < 400) { // als je met je muis in dit vierkant gaat ga je naar het volgende scherm
            spelStatus = UITLEGSCHIETEN; // zorgt dat je naar het volgende scherm gaat
        }

    break;
    case UITLEGSCHIETEN: // interactief beginscherm dat uitlegt hoe je moet schieten
        tekenVeld();
        tekenUitlegSchietenScherm();
        beweegSpeler();
        tekenSpeler(spelerX, spelerY);
        beweegKogel();
        tekenKogels();

        if (kogelsX > 400 && kogelsX < 490 && kogelsY < 300) { // als je in dit vakje schiet ga je naar het volgende scherm
            spelStatus = UITLEGVERHAAL; // zorgt dat je naar de uitleg van de game gaat
        }
 

    break;
    case UITLEGVERHAAL: // interactief beginscherm dat het verhaal rondom het spel uitlegt
        tekenUitlegVerhaalScherm();

        if (keyIsPressed === true && key === " ") { // als je spatie indrukt ga je naar het begin van het spel
            spelStatus = SPELEN; // zorgt dat de game begint
            score = 0;
            level = 0;
            aantalLevens = 3;
        }

    break;
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      // voor iedere vijand checken of kogel 'm raakt
      for(var i = 0; i < vijandenX.length; i++) {
        if (checkVijandGeraakt(i) === true) {
          // punten erbij
          score++;

          // nieuwe vijand maken en oude verwijderen
            verwijderVijand(i);
            maakNieuweVijand();

        if (score > 4){ // voorwaarde level 1
            level = 1;
        }
        if (score > 9){ //voorwaarde level 2
            level = 2;
        }
        if (score > 14){ //voorwaarde level 3
            level = 3;
        }
        if (score > 19){ // voorwaarde level 4
            level = 4;
        }
        if (score > 24){ //voorwaarde level 5
            level = 5;
        } 

        if (level === 1){
           minimaleSnelheidVijand = 3; // verhoogt minimale snelheid van de vijand
        }
        
        if (level === 2){
            maximaleSnelheidVijand = 7; // verhoogt maximale snelheid van de vijand
        }

        if (level === 3){
            minimaleSnelheidVijand = 4; // verhoogt minimale snelheid van de vijand
        }

        if (level === 4){
            maximaleSnelheidVijand = 8; // verhoogt maximale snelheid van de vijand
        }

        if (level === 5){
            minimaleSnelheidVijand = 6; // verhoogt minimale en maximale snelheid van de vijand
            maximaleSnelheidVijand = 9;
        }
    }
        
      }


    for(var i = 0; i < vijandenX.length; i++) {
      if (checkSpelerGeraakt(i) === true) {
        // levens
        aantalLevens--;

        // nieuwe vijand maken en oude verwijderen
        verwijderVijand(i);
        maakNieuweVijand();
      }
    }

      tekenVeld();
      tekenVijand();
      tekenKogels();
      tekenSpeler(spelerX, spelerY);
      tekenTimer(); 
      timerLoopt();
      tekenScore();
      tekenLevel();
      tekenLevens();

      if (checkGameOver()) { // zorgt dat je game over gaat
        spelStatus = GAMEOVER;
      }
    if (score === 5){ // dit zorgt dat je bij een bepaald aan punten in een volgend level komt
         spelStatus = LEVEL1;   
    }
    if (score === 9){
         spelStatus = LEVEL2;   
    }
    if (score === 14){
         spelStatus = LEVEL3;   
    }
    if (score === 19){
         spelStatus = LEVEL4;   
    }
    if (score === 24){
         spelStatus = LEVEL5;   
    }

    break;
    case GAMEOVER:
        tekenGameOverScherm(); // als je gameover bent ga je naar het gameover scherm


        if ( mouseIsPressed === true && mouseX > 300 && mouseX < 1050 && mouseY > 400 && mouseY < 450) { // als je hierop klikt begin je weer opnieuw nadat je gameover was
            spelStatus = SPELEN;
            
            aantalLevens = 3;
            score = 0;
            level = 0;
        }
    break;
    case LEVEL1:
        tekenLevelScherm(plaatjeLevel1); //tekent scherm level 1
        score = 6;

        if ( mouseIsPressed === true && mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) { // KLIK hierop en begin level 1
            spelStatus = SPELEN;
        }

    break;
    case LEVEL2: // tekent scherm level 2
        tekenLevelScherm(plaatjeLevel2);
        score = 10;

        if ( mouseIsPressed === true && mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) { //klik hierop en begin level 2
            spelStatus = SPELEN;
        }
    
    break;
    case LEVEL3:
        tekenLevelScherm(plaatjeLevel3); //tekent scherm level 3
        score = 15;

        if ( mouseIsPressed === true && mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) { //klik hierop en begin level 3
            spelStatus = SPELEN;
        }

    break;
    case LEVEL4:
        tekenLevelScherm(plaatjeLevel4); // tekent scherm level 4
        score = 20;

        if ( mouseIsPressed === true && mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) { // klik hierop en begin level 4
            spelStatus = SPELEN;
        }

    break;
    case LEVEL5:
        tekenLevelScherm(plaatjeLevel5); // tekent scherm level 5
        score = 25;

        if ( mouseIsPressed === true && mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) { // klik hierop en begin level 5
            spelStatus = SPELEN;    
  }
}
}
