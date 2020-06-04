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

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 650; // x-positie van speler
var spelerY = 650; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten
var plaatje; // zorgt ervoor dat we de achtergrond kunnen laden
var plaatjeSpeler; // zorgt ervoor dat we de speler kunnen laden


/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

function preload() {
    plaatje = loadImage('plaatjes/achtergrondStad.jpg')
    plaatjeSpeler = loadImage('plaatjes/playerKat.png')
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
var tekenVijand = function(x, y) {
    

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


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




/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

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
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
