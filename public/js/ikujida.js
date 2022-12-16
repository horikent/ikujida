
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("/audio/typing-sound.mp3");
const wrongSound = new Audio("/audio/wrong.mp3");
const correctSound = new Audio("/audio/correct.mp3");

// inputテキスト入力。合っているかどうかの判定。



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
        // console.log("correct");
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
      } else {
        characterSpan.classList.add("incorrect");
        characterSpan.classList.remove("correct");
        wrongSound.volume = 0.3;
        wrongSound.play();
        wrongSound.currentTime = 0;
        correct = false;
      }
  });
  if(correct === true) {
    correctSound.play();
    correctSound.currentTime = 0;
    setTimeout(() => {
    window.location.reload();
    }, 450);
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
let originTime = 30;
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




