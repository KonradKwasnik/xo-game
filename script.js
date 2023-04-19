'use strict';

const arrback = [];
const arr = [];
const scorex = document.querySelector('#scoreX');
const scoreo = document.querySelector('#scoreO');
const boxMain = document.querySelector('img');
//const bwinning = document.querySelector('#boxmain');
const turn = document.querySelector('#turn');
const winningText = document.querySelector('#winning');
const nowPlays = document.querySelector('#nowplays');
const box = document.querySelector('.wrapper');

let scoreCountX = 0;
let scoreCountO = 0;
for (let i = 1; i < 10; i++) {
  arrback.push(document.querySelector(`#theback${i}`));
}

for (let i = 1; i < 10; i++) {
  arr.push(document.querySelector(`#inbox${i}`));
}
let int = 0;
let usedTable = [];
let oWinning = [];
let xWinning = [];
let w = 0;
const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
console.log(arr.length);

const includesAll = (arr, values) => values.every(v => arr.includes(v));
//warunki początkowe
const gameReset = function (czas) {
  setTimeout(() => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.transform = 'rotateY(0deg)';
    }
    boxMain.src = '';
    boxMain.style = '';
    winningText.innerHTML = ``;
    nowPlays.removeAttribute('hidden', '');
    box.style.zIndex = '';
    usedTable = [];
    oWinning = [];
    xWinning = [];
    w = 0;
  }, czas);
};

///wspólne wartosci
const gameWiningCommonConditions = function () {
  w = 1;
  nowPlays.setAttribute('hidden', '');
  box.style.zIndex = '-1';

  usedTable = [0, 1, 2, 3, 4, 5, 6, 7, 8];
};

///////////////////////////////

//obracanie kart
for (let i = 0; i < 9; i++) {
  arr[i].addEventListener('click', function () {
    if (usedTable.includes(i)) return;
    usedTable.push(i);
    //obrót x
    if (int % 2) {
      setTimeout(() => {
        turn.innerHTML = 'x';
      }, 350);

      arrback[i].innerHTML = '<img style width=100% height=100% src="o.png"  >';
      arr[i].style.transform = 'rotateY(180deg)';
      oWinning.push(i);
      //obrót o
    } else {
      setTimeout(() => {
        turn.innerHTML = 'o';
      }, 350);

      arrback[i].innerHTML = '<img width=100% height=100% src="x.png" >';
      arr[i].style.transform = 'rotateY(180deg)';
      xWinning.push(i);
    }

    int++;
    //warunki wygrania
    for (let j = 0; j < 8; j++) {
      //xwinning
      if (includesAll(xWinning, winning[j])) {
        gameWiningCommonConditions();
        setTimeout(() => {
          boxMain.src = `image/xo${j}.png`;
          boxMain.style = 'width:100%;height:100%;';
        }, 500);
        winningText.innerHTML = 'x wins';
        scoreCountX++;
        scorex.innerHTML = scoreCountX;
        gameReset(2000);
        return;
        //o winning
      } else if (includesAll(oWinning, winning[j])) {
        gameWiningCommonConditions();
        setTimeout(() => {
          boxMain.src = `image/xo${j}.png`;
          boxMain.style = 'width:100%;height:100%;';
        }, 500);
        winningText.innerHTML = 'o wins';
        scoreCountO++;
        scoreo.innerHTML = scoreCountO;
        gameReset(2000);
      }
    }
    //draw
    if (usedTable.length >= 9 && w === 0) {
      console.log('draw');
      nowPlays.setAttribute('hidden', '');
      winningText.innerHTML = 'draw';
      gameReset(1000);
    }
  });
}
