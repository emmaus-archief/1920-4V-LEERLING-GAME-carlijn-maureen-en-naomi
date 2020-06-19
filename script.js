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

var SPEELVELDHOOGTE;
var SPEELVELDBREEDTE;

const BEGIN = 0;
const UITLEGBEWEGEN1 = 1;
const UITLEGBEWEGEN2 = 2;
const UITLEGSCHIETEN = 3;
const UITLEGVERHAAL = 4;
const SPELEN = 5;
const GAMEOVER = 6;

var level = 0; 
var score = 0;
var aantalLevens = 3;

var spelStatus = BEGIN;

var stopwatchMiliSec = 0;
var stopwatchSec = 0;
var stopwatchMin = 0;

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
var minimaleSnelheidVijand = 2;
var maximaleSnelheidVijand = 6;

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


/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


function preload() {
    plaatje = loadImage('plaatjes/achtergrondStad.jpg')
    plaatjeSpeler = loadImage('plaatjes/playerKat2.png')
    plaatjeVijandEen = loadImage('plaatjes/vijand-1.png')
    plaatjeKogel = loadImage('plaatjes/kogel.png')
    plaatjeMoveHere = loadImage('plaatjes/move-here.jpg')
    plaatjeShootHere = loadImage('plaatjes/shoot-here.jpg')
    plaatjeSpaceShip = loadImage('plaatjes/binnenSpaceShip.jpg')
    plaatjeLevendeVis = loadImage('plaatjes/vis.PNG')
    plaatjeDodeVis = loadImage('plaatjes/dodeVis.PNG')
    naamGame = loadImage('plaatjes/naamGame.PNG')
    textMoveMouse = loadImage('plaatjes/text-move-mouse.PNG')
    textPressShoot = loadImage('plaatjes/press-space.PNG')
    textVerhaal = loadImage('plaatjes/text-verhaal.PNG')

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
    image(plaatjeSpeler, 80, 300, 250, 250);
    image(plaatjeVijandEen, 1000, 100, 150, 150);
    image(plaatjeKogel, 900, 400, 90, 180);
    image(naamGame, 150, -50, 1000, 400);
        
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

    image(textVerhaal, 250, 100, 800, 500);
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


/**
 * Tekent de kogel of de bal
 */
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
  image(plaatjeSpeler, mouseX, spelerY - 100, 149, 150); // afbeelding speler >>> spelerY - 100 omdat het anders onder het scherm komt
  //ellipse(mouseX, spelerY, 50, 50); // voor als we weer terug willen naar een witte ellipse
}
/* deze is voor asdw beweging maar wel houterig
function keyTyped() {
  if (key === 'a') {
    spelerX = spelerX - 20;
  } else if (key === 'w') {
    spelerY = spelerY - 20;
  }
else if (key === 'd') {
    spelerX = spelerX + 20;
  }
else if (key === 's') {
    spelerY = spelerY + 20;
  }

} 
*/

function tekenScore() {
    fill(7, 87, 217);  
    rect(25, 15, 150, 50); 

    fill(255, 255, 255);
    textSize(24);
    text("Score: "+score , 50, 30, 150, 100);
}

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
    text(timerString , SPEELVELDBREEDTE - 80, 30, 100, 50);
}

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
  
  if (keyIsPressed === true) {
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

function verwijderKogel(nummer) {
    kogelsX.splice(nummer, 1);
    kogelsY.splice(nummer, 1);
}

function verwijderVijand(nummer) {
    vijandenX.splice(nummer, 1);
    vijandenY.splice(nummer, 1)
}

function maakNieuweVijand() {
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

var checkVijandGeraakt = function(vijandNummer) {
  var teruggeefWaarde = false;


  for(var i = 0; i < kogelsX.length; i++) {
    if (collideRectRect(kogelsX[i], kogelsY[i], 30, 60, vijandenX[vijandNummer], vijandenY[vijandNummer], 60, 60)) {
        teruggeefWaarde = true;
        
         
        // verwijder de kogel die de vijand raakt
        verwijderKogel(i);

        // schrijf boodschap in de console, handig bij het testen van de game
        console.log("Vijand " + vijandNummer + " door kogel " + i);
        
    }
  }


    return teruggeefWaarde;
};

/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
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

    if (stopwatchMiliSec == 60) {
        stopwatchSec++;
        stopwatchMiliSec = 0;
    }
    if (stopwatchSec == 60) {
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
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('grey');

  SPEELVELDHOOGTE = height - 2 * 20;
  SPEELVELDBREEDTE = width - 2 * 20;

  console.log(vijandenX);

  for (var i = 0; i < 5; i++) {
    console.log("Dit is nummer " + i);
    vijandenX.push(random(20, 1220));
    vijandenY.push(random(-250, -30));
    vijandenSnelheid.push(random(2, 10));
  }
  
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case BEGIN:
        tekenVeld(); //achtergrond
        tekenBeginScherm ();

        if ( mouseIsPressed === true && mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) {
            spelStatus = UITLEGBEWEGEN1;
        }

    break;
    case UITLEGBEWEGEN1:
        tekenVeld();
        tekenUitlegBewegenScherm(1000, 590);
        beweegSpeler();
        tekenSpeler(spelerX, spelerY);

        if (mouseX > 970 && mouseX < 1101) {
            spelStatus = UITLEGBEWEGEN2;
        }

    break;
    case UITLEGBEWEGEN2:
        tekenVeld();
        tekenUitlegBewegenScherm(300, 590);
        beweegSpeler();
        tekenSpeler(spelerX, spelerY);

        if (mouseX > 270 && mouseX < 400) {
            spelStatus = UITLEGSCHIETEN;
        }

    break;
    case UITLEGSCHIETEN:
        tekenVeld();
        tekenUitlegSchietenScherm();
        beweegSpeler();
        tekenSpeler(spelerX, spelerY);
        beweegKogel();
        tekenKogels();

        if (kogelsX > 400 && kogelsX < 490 && kogelsY < 300) {
            spelStatus = UITLEGVERHAAL;
        }


    break;
    case UITLEGVERHAAL:
        tekenUitlegVerhaalScherm();

        if (keyIsPressed === true && key === " ") {
            spelStatus = SPELEN;
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

        if (score > 4){ // het lukt mij niet om hier een for loop van te maken,
            level = 1; // als iemand anders het wel kan graag
        }
        if (score > 9){
            level = 2;
        }
        if (score > 14){
            level = 3;
        }
        if (score > 19){
            level = 4;
        }
        if (score > 24){
            level = 5;
        }

        // snellere snelheden

        if (level === 1){
           minimaleSnelheidVijand = 3; //dit werkt alleen je kan het niet heel goed zien
        }
        
        if (level === 2){
            maximaleSnelheidVijand = 7;
        }

        if (level === 3){
            minimaleSnelheidVijand = 5;
        }

        if (level === 4){
            maximaleSnelheidVijand = 9;
        }

        if (level === 5){
            minimaleSnelheidVijand = 7;
            maximaleSnelheidVijand = 10;
        }
        }
        
      }

      


      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
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

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}

/*
function tekenTimer() {
    text(timer, 50, 50, 50, 50);
    color: red;
}
*/

