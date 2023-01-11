// 変数の初期化
let untyped = "";
let typed = "";
let score = 0;

// 必要なHTML要素の取得
const typedfield = document.getElementById("typed");
const untypedfield = document.getElementById("untyped");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");

const typeSound = new Audio("./audio/typing-sound.mp3");
const wrongSound = new Audio("./audio/wrong.mp3");
const correctSound = new Audio("./audio/correct.mp3");

// 複数のテキストを格納する配列
// const textList = [
//   'Hello World','This is my App','How are you?',
//   'Today is sunny','I love JavaScript!','Good morning',
//   'I am Japanese','Let it be','Samurai',
//   'Typing Game','Information Technology',
//   'I want to be a programmer','What day is today?',
//   'I want to build a web app','Nice to meet you',
//   'Chrome Firefox Edge Safari','machine learning',
//   'Brendan Eich','John Resig','React Vue Angular',
//   'Netscape Communications','undefined null NaN',
//   'Thank you very much','Google Apple Facebook Amazon',
//   'ECMAScript','console.log','for while if switch',
//   'var let const','Windows Mac Linux iOS Android',
//   'programming'
// ];

// ランダムなテキストを表示
const createText = () => {
    // 正タイプした文字列をクリア
    typed = "";
    typedfield.textContent = typed;

    // // 配列のインデックス数からランダムな数値を生成する
    //   let random = Math.floor(Math.random() * textList.length);

    // 配列からランダムにテキストを取得し画面に表示する
    // untyped = textList;
    untyped = untypedfield.innerHTML;
};

// キー入力の判定
const keyPress = (e) => {
    typeSound.play();
    typeSound.currentTime = 0;

    // 誤タイプの場合
    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add("mistyped");
        //  100ms後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove("mistyped");
        }, 100);
        wrongSound.volume = 0.3;
        wrongSound.play();
        wrongSound.currentTime = 0;
        return;
    }

    // 正タイプの場合
    // スコアのインクリメント
    score++;
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示

      // ページの一部だけをreloadする方法
      // Ajaxを使う方法
      // XMLHttpRequestを使ってAjaxで更新

    let url ='/typing';

    function ajaxUpdate(url, wrap) {
    
      // urlを加工し、キャッシュされないurlにする。
      url = url + '?ver=' + new Date().getTime();
  
      // ajaxオブジェクト生成
      var ajax = new XMLHttpRequest;
  
      // ajax通信open
      ajax.open('GET', url, true);
  
      // ajax返信時の処理
      ajax.onload = function () {
  
          // ajax返信から得たHTMLでDOM要素を更新
          element.innerHTML = ajax.responseText;
      };
  
      // ajax開始
      ajax.send(null);
  }
    window.addEventListener('load', function () {
  
      var url = "ajax.html";
      var div = document.getElementById('ajaxreload');

      if (untyped === "") {
        correctSound.play();
        correctSound.currentTime = 0;
        ajaxUpdate(url, div);
    }
  
  });
};

// タイピングスキルのランクを判定
const rankCheck = (score) => {
    // テキストを格納する変数を作る
    let text = "";

    // スコアに応じて異なるメッセージを変数textに格納する
    if (score < 100) {
        text = `あなたのランクはCです。 \nBランクまであと${
            100 - score
        }文字です。`;
    } else if (score < 200) {
        text = `あなたのランクはBです。 \nAランクまであと${
            200 - score
        }文字です。`;
    } else if (score < 300) {
        text = `あなたのランクはAです。 \nSランクまであと${
            300 - score
        }文字です。`;
    } else if (score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = (id) => {
    clearInterval(id);

    const result = confirm(rankCheck(score));

    // OKボタンをクリックされたらリロードする
    if (result == true) {
        window.location.reload();
    }
};

// カウントダウンタイマー
const timer = () => {
    // タイマー部分のHTML要素(p要素)を取得する
    let time = count.textContent;

    const id = setInterval(() => {
        // カウントダウンする
        time--;
        count.textContent = time;

        // カウントが0になったらタイマーを停止する
        if (time <= 0) {
            gameOver(id);
        }
    }, 1000);
};

// ゲームスタート時の処理
document.addEventListener("DOMContentLoaded", () => {
    // カウントダウンタイマーを開始する
    timer();

    // ランダムなテキストを表示する
    createText();

    // 「スタート」ボタンを非表示にする
    // start.style.display = 'none';

    // キーボードのイベント処理
    document.addEventListener("keypress", keyPress);
});

// untypedfield.textContent = 'スタートボタンで開始';
