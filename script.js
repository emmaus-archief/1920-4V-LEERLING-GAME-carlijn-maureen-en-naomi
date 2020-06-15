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

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var stopwatchMiliSec = 0;
var stopwatchSec = 0;
var stopwatchMin = 0;

var spelerX = 650; // x-positie van speler
var spelerY = 650; // y-positie van speler

var isKogelZichtbaar = false; //geeft aan waneer de kogel te zien is
var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandenX = [];   // x-positie van vijand
var vijandenY = [];   // y-positie van vijand
var vijandenSnelheid = []; //de snelheid van de vallende vijanden
var vijandYSnelheid = -2; // verticale snelheid van de vijanden

var score = 0; // aantal behaalde punten
var plaatje; // declareert afb. achtergrond
var plaatjeSpeler; // declareert afb. speler
var plaatjeVijandEen; // declareert afb. vijand 1

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

function preload() {
    plaatje = loadImage('plaatjes/achtergrondStad.jpg')
    plaatjeSpeler = loadImage('plaatjes/playerKat2.png')
    plaatjeVijandEen = loadImage('plaatjes/vijand-1.png')
}

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  
    fill('pink'); // laat dit staan, anders werkt het niet
  image(plaatje, 0, 0, width + 50, height + 50); // is de achtergrond, '+ 50' zodat de lelijke onderkant er niet op komt
  //rect(20, 20, width - 2 * 20, height - 2 * 20); // voor het geval dat we weer een roze achtergrond willen
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function() {
    for (var i = 0; i < vijandenX.length; i++) {
        //fill('blue');
        image(plaatjeVijandEen, vijandenX[i], vijandenY[i], 100, 100);
        //ellipse(vijandenX[i], vijandenY[i], 35, 35);
    }

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
    if (isKogelZichtbaar === true) {
        fill (0, 255, 255);
        ellipse (x, y, 10, 10);
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
    
    textSize(18);
    text(timerString , SPEELVELDBREEDTE - 60, 30, 100, 50);
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
            vijandenSnelheid[i] = random(2, 6);
       }
    }
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {
    if (keyIsPressed === true) {
        if (key === " ") {
            kogelX = mouseX + 140;
            kogelY = spelerY - 45;
            isKogelZichtbaar = true;
        }
    }

    if (isKogelZichtbaar === true) {
        kogelY = kogelY - 3; 
    }
};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {

};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
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
    
  return false;
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
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand();
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
      tekenTimer(); 
      timerLoopt();

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

