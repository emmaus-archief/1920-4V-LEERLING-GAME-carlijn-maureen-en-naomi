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

var spelStatus = BEGIN;

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
var naamGame;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

function preload() {
    plaatje = loadImage('plaatjes/achtergrondStad.jpg')
    plaatjeSpeler = loadImage('plaatjes/playerKat2.png')
    plaatjeVijandEen = loadImage('plaatjes/vijand-1.png')
    naamGame = loadImage('plaatjes/naamGame.PNG');
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
    image(naamGame, 150, -50, 1000, 400);
        
    // tekst en vormen:

    fill(200, 200, 200);
     if ( mouseX > 300 && mouseX < 1050 && mouseY > 600 && mouseY < 650) {
            fill(150, 150, 150);
     }   
    noStroke();
    rect(300, 600, 750, 50); //rechthoek waar je om moet klikken om te beginnen

    fill(0, 0, 0);
    textSize(30);
    text("click here to start!", 560, 610, 550, 700); // text in rechthoek
}

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

        fill(0, 0, 0);
        textSize(30);
        text("Move your mouse to move", 500, 100, 500, 50);

        fill(200, 170, 200);
        noStroke();
        rect(1000, 590, 100, 100); //vierkant waar je heen moet bewegen
        
        fill(0, 0, 0);
        textSize(20);
        text("move \nhere!", 1025, 610, 1010, 650);

        beweegSpeler();
        tekenSpeler(spelerX, spelerY);

        if (mouseX > 970 && mouseX < 1100) {
            spelStatus = UITLEGBEWEGEN2;
        }

    break;
    case UITLEGBEWEGEN2:
        tekenVeld();
        fill(0, 0, 0);
        textSize(30);
        text("Move your mouse to move", 500, 100, 500, 50);

        fill(200, 170, 200);
        noStroke();
        rect(300, 590, 100, 100);
        
        fill(0, 0, 0);
        textSize(20);
        text("move \nhere!", 325, 610, 1010, 650);

        beweegSpeler();
        tekenSpeler(spelerX, spelerY);

        if (mouseX > 270 && mouseX < 400) {
            spelStatus = UITLEGSCHIETEN;
        }

    break;
    case UITLEGSCHIETEN:
        tekenVeld();
        fill(255, 255, 255);
        textSize(30);
        text("Press space to shoot", 500, 100, 500, 50);

        fill(200, 170, 200);
        noStroke();
        rect(400, 200, 100, 100);

        fill(0, 0, 0);
        textSize(20);
        text("shoot \nhere!", 425, 230, 1010, 650);

        beweegSpeler();
        tekenSpeler(spelerX, spelerY);
        beweegKogel();
        tekenKogel(kogelX, kogelY);

        if (kogelX > 400 && kogelX < 490 && kogelY < 300) {
            spelStatus = UITLEGVERHAAL;
        }

    break;
    case UITLEGVERHAAL:
        background(50, 0, 255);
        fill(255, 255, 255);
        textSize(30);
        text("HELP! Save the world.", 500, 100, 500, 50);

        if (keyIsPressed === true && key === " ") {
            spelStatus = SPELEN;
        }

    break;
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

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
