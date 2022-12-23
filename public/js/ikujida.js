
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("/audio/typing-sound.mp3");
const wrongSound = new Audio("/audio/wrong.mp3");
const correctSound = new Audio("/audio/correct.mp3");


// function setWord(){
//   typeDisplay.textContent = word;
//   loc = 0;
// }

// let word;
// let loc = 0;
// let score = 0;
// let miss = 0;
// let startTime;
// let isPlaying = false;

// const scoreLabel = document.getElementById('score');
// const missLabel = document.getElementById('miss');

// document.addEventListener('click', ()=>{
//   if(isPlaying === true){
//     return;
//   }
//   isPlaying = true;
//   startTime = Date.now();
//   setWord();
// });

// document.addEventListener('input', e => {
//   typeSound.play();
//   typeSound.currentTime = 0;
//   const arrayValue = typeInput.value.split("");
//   if(arrayValue[loc] !== word[loc]){
//     miss++; // ミス数プラス1
//     missLabel.textContent = miss; // ミス数を表示
//     word.classList.add("incorrect");
//     word.classList.remove("correct");
//     wrongSound.volume = 0.3;
//     wrongSound.play();
//     wrongSound.currentTime = 0;
//     return;
//   }

//   loc++;
//   score++; // 正解数プラス1
//   scoreLabel.textContent = score; 


//   if(loc === word.length){
//     if (words.length === 0){
//       const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
//       const result = document.getElementById('result');
//       result.textContent = `Finished! ${elapsedTime} seconds!`;
//       return;

//     }
//     setWord();
//   }
// }); 

// function result() {
//   const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100; // 正解率計算
//   alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`); // 正解率表示
// }

// inputテキスト入力。合っているかどうかの判定。


let score = 0;
let miss = 0;
const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');

typeInput.addEventListener("input", () =>{
  // タイプ音をつける
  typeSound.play();
  typeSound.currentTime = 0;
  const sentenceArray = typeDisplay.querySelectorAll("span");
  const arrayValue = typeInput.value.split("");
  let correct = true;
  sentenceArray.forEach((characterSpan, index) => {
      if((arrayValue[index] == null)){
        characterSpan.classList.remove("correct");
        characterSpan.classList.remove("incorrect");
        correct = false;
      } else if (characterSpan.innerText == arrayValue[index]){
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
        score++; // 正解数プラス1
        scoreLabel.textContent = score; 
      } else {
        characterSpan.classList.add("incorrect");
        characterSpan.classList.remove("correct");
        wrongSound.volume = 0.3;
        wrongSound.play();
        wrongSound.currentTime = 0;
        miss++; 
        missLabel.textContent = miss; 
        correct = false;
      }
  });


  if(correct === true) {
    correctSound.play();
    correctSound.currentTime = 0;
    setTimeout(() => {
    window.location.reload();
    }, 340);
  }
});


  let text = typeDisplay.textContent;
  //splitで<span>に区切る
  let result = text.split('');
  let newText = '';

  for(let i = 0; i < result.length; i++){
      newText += '<span>' + result[i] + '</span>';
    }

  //newTextを書き換える
  typeDisplay.innerHTML = newText;
  /* テキストボックスの中身を消す。 */
  typeInput.value = "";

  
let startTime;
let originTime = 20;
     /* タイマーのリセット */
StartTimer();
function StartTimer(){
  timer.innerText = originTime;
  startTime = new Date();
  console.log(startTime);
  setInterval(() => {
    timer.innerText = originTime - getTimerTime();
    if(timer.innerText <= 0) TimeUP();
  }, 1000);
}


function getTimerTime(){
  return Math.floor(
    (new Date() - startTime) / 1000);
}

function TimeUP(){
  correct = false;
  wrongSound.volume = 0.3;
  wrongSound.play();
  wrongSound.currentTime = 0;
  setTimeout(() => {
  window.location.reload();
  }, 450);
}


document.getElementById('muteBtn').onclick = function(){
  document.getElementById('typeSound').muted = true
  document.getElementById('correctSound').muted = true
  document.getElementById('wrongSound').muted = true
}