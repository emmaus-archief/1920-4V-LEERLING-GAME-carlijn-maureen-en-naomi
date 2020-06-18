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


var score = 0;
var aantalLevens = 3;


var spelStatus = SPELEN;

var stopwatchMiliSec = 0;
var stopwatchSec = 0;
var stopwatchMin = 0;

var spelerX = 650; // x-positie van speler
var spelerY = 650; // y-positie van speler

//var isKogelZichtbaar = false; //geeft aan waneer de kogel te zien is
var kogelsX = [];    // x-positie van kogels
var kogelsY = [];    // y-positie van kogels
var kogelTimer = 0;

var vijandenX = [];   // x-positie van vijand
var vijandenY = [];   // y-positie van vijand
var vijandenSnelheid = []; //de snelheid van de vallende vijanden
var vijandYSnelheid = -2; // verticale snelheid van de vijanden

var score = 0; // aantal behaalde punten

// alle afbeeldingen
var plaatje; // declareert afb. achtergrond
var plaatjeSpeler; // declareert afb. speler
var plaatjeVijandEen; // declareert afb. vijand 1
var plaatjeKogel; // declareert afb. kogel
var plaatjeMoveHere; // declareert afb. move here blokje
var plaatjeShootHere; // declareert afb. shoot here blokje
var plaatjeSpaceShip; // declareert afb. die wordt gebruikt als achtergrond bij verhaal
var naamGame; // declareert afb. naam game op beginscherm
var textMoveMouse; // declareert afb. move your mouse to move
var textPressShoot; // declareert afb. press space to shoot
var textVerhaal; // declareert afb. met het verhaal



/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

var score = 0; // aantal behaalde punten

function preload() {
    plaatje = loadImage('plaatjes/achtergrondStad.jpg')
    plaatjeSpeler = loadImage('plaatjes/playerKat2.png')
    plaatjeVijandEen = loadImage('plaatjes/vijand-1.png')
    plaatjeKogel = loadImage('plaatjes/kogel.png')
    plaatjeMoveHere = loadImage('plaatjes/move-here.jpg')
    plaatjeShootHere = loadImage('plaatjes/shoot-here.jpg')
    plaatjeSpaceShip = loadImage('plaatjes/binnenSpaceShip.jpg')
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
    textSize(24);
    text(""+score , width-100, 50, 150, 100);
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
        
        // verwijder de kogel in kwestie
        //verwijderKogel(j);

        // schrijf boodschap in de console, handig bij het testen van de game
        console.log("Vijand " + vijandNummer + " door kogel " + i);
    }
  }


    return teruggeefWaarde;
};

function verwijderVijand(nummer) {
    console.log("verwijder vijand " + nummer);
    vijandenX.splice(nummer, 1);
    vijandenY.splice(nummer, 1)
    vijandenSnelheid.splice(nummer, 1);
}


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

        if (mouseX > 970 && mouseX < 1100) {
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
        tekenKogels(kogelX, kogelY);

        if (kogelX > 400 && kogelX < 490 && kogelY < 300) {
            spelStatus = UITLEGVERHAAL;
        }

    break;
    case UITLEGVERHAAL:
        tekenUitlegVerhaalScherm();

        if (keyIsPressed === true && key === " ") {
            spelStatus = SPELEN;
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
          // nieuwe vijand maken
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

