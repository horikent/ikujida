// 変数の初期化
let untyped = "";
let typed = "";
let jpWord = "";
let score = 0;
let wrong = 0;
let typedWords = [];

// 必要なHTML要素の取得
let typedfield = document.getElementById("typed");
let untypedfield = document.getElementById("untyped");
let jpWordfield = document.getElementById("jpWord");

const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");

const typeSound = new Audio("./audio/typing-sound.mp3");
const wrongSound = new Audio("./audio/wrong.mp3");
const correctSound = new Audio("./audio/correct.mp3");

// Ajaxで取得した要素を格納するための変数
let doc;

// untypedfieldのHTML要素をuntypedにセット
const setText = () => {
    // 正タイプした文字列をクリア
    typed = "";
    typedfield.textContent = typed;
    untyped = untypedfield.textContent;
    jpWord = jpWordfield.textContent;
};

// キー入力の判定
const keyPress = (e) => {
        $.ajax({
            type: "GET",
            url: "/ajax",
            data: {
                typed: typed,
                untyped: untyped,
                jpWord: jpWord
                },
            // async: false, // 追加
            success: function(data) {
                let parser = new DOMParser();
                let doc = parser.parseFromString(data, "text/html");

                const newJpWord = doc.getElementById("jpWord").textContent;
                if (newJpWord) {
                  jpWord = newJpWord;
                  jpWordfield.textContent = jpWord;
                }
                // var typedfield = doc.getElementById("typed");   
                // var untypedfield= doc.getElementById("untyped");   
                // var jpWordfield = doc.getElementById("jpWord").textContent;
                // console.log(jpWord);
                // typedfield.textContent = typed;
                // untypedfield.textContent = untyped;      
                // jpWordfield.textContent = jpWord;
                
                }
        });

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
        wrong++;
        return;
    }

    // 正タイプの場合
    // スコアのインクリメント
    score++;
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    if (untyped === "") {
        correctSound.play();
        correctSound.currentTime = 0;
        // 配列にタイプした用語を追加
        typedWords.push(jpWord);
        typedWords.push(typed);
        // テキストがなくなったら新しいテキストを表示
        var url = "/ajax";
        var div = document.getElementById("ajaxreload");
        ajaxUpdate(url, div);
    }
};


// Ajaxを使いページの一部だけをreloadする方法
// XMLHttpRequestを使ってAjaxで更新
function ajaxUpdate(url, element) {
    // urlを加工し、キャッシュされないurlにする。
    url = url + "?ver=" + new Date().getTime();
    // ajaxオブジェクト生成
    var ajax = new XMLHttpRequest();
    // ajax通信open
    ajax.open("GET", url, true);
    // ajax返信時の処理
    ajax.onload = function () {
        // ajax返信から得たHTMLでDOM要素を更新
        element.innerHTML = ajax.responseText;
        setTextAjax();
    };
    // ajax開始
    ajax.send(null);
}

// ajaxで取得したデータのHTML要素をuntypedにセット
const setTextAjax = () => {
    // typedとuntypedをクリア
    typed = "";
    untyped = "";
    jpWord = "";
    // // ajaxから取得したtypedAjaxとuntypedAjaxからHTML要素を取得
    typedfield = document.getElementById("typed");
    untypedfield = document.getElementById("untyped");
    jpWordfield = document.getElementById("jpWord");

    // // 取得した要素をtypedとuntypedにセット
    typedfield.textContent = typed;
    untyped = untypedfield.textContent;
    jpWordfield.textContent = jpWord;
};


// ゲームスタート時の処理
document.addEventListener("DOMContentLoaded", () => {
    // カウントダウンタイマーを開始する
    timer();
    // 用語をuntypedにセット
    setText();
    // キーボードのイベント処理
    document.addEventListener("keypress", keyPress);
});


const gameOver = (id) => {
    clearInterval(id);
    // スコアをモーダルウィンドウに表示
    const modal = document.getElementById("modal");
    const result = document.getElementById("result");
    const modalText = document.getElementById("modalText");
    result.textContent = `Score: ${score}`;
    modalText.textContent = getAgeText(score);
    modal.style.display = 'block';

    // モーダルウィンドウの「閉じる」ボタンをクリックしたら、モーダルウィンドウを非表示にする
    const closeBtn = document.getElementById("close");
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
    };

      // OKボタンをクリックしたら、モーダルウィンドウを非表示にする
    const reTry = document.getElementById("retry");
    reTry.onclick = function() {
        modal.style.display = "none";
        restartGame(); // ゲームを再開する関数を呼び出す
    }

    // ゲームを再開する関数
    const restartGame = () => {
    // ゲームを再開する処理をここに記述する
    window.location.reload();
    }


// タイピングスキルのランクを判定
const getAgeText = (score) => {
    // テキストを格納する変数を作る
    let text = "";

    // スコアに応じて異なるメッセージを変数textに格納する
    if (score * 11 / 365 < 1) {
        text = `お子さんは0歳です。 \n1歳の誕生日まであと${
            365 - score * 11 
        }日です。`;
    } else if (score * 11 / 365 < 2) {
        text = `お子さんは1歳です。 \n2歳の誕生日まであと${
            730 - score * 11 
        }日です。`;
    } else if (score * 11 / 365 < 3) {
        text = `お子さんは2歳です。 \n3歳の誕生日まであと${
            1095 - score * 11 
        }文字です。`;
    } else if (score * 11 / 365 < 4) {
        text = `お子さんは3歳です。 \n4歳の誕生日まであと${
            1460 - score * 11 
        }文字です。`;
    } else if (score * 11 / 365 < 5) {
        text = `お子さんは4歳です。 \n5歳の誕生日まであと${
            1825 - score * 11 
        }文字です。`;
    } else if (score * 11 / 365 < 6) {
        text = `お子さんは5歳です。 \n6歳の誕生日まであと${
            2190 - score * 11
        }文字です。`;
    } else if (score * 11 / 365 < 7) {
        text = `お子さんは6歳です。 \n7歳の誕生日まであと${
            2555 - score * 11 
        }日です。`;
    } else if (score * 11 / 365 < 8) {
        text = `お子さんは7歳です。 \n8歳の誕生日まであと${
            2920 - score * 11 
        }文字です。`;
    } else if (score * 11 / 365 < 9) {
        text = `お子さんは8歳です。 \n9歳の誕生日まであと${
            3285 - score * 11
        }文字です。`;
    } else if (score * 11 / 365 < 10) {
        text = `お子さんは9歳です。 \n10歳の誕生日まであと${
            3650 - score * 11 
        }文字です。`;
    } else if (score * 11 / 365 < 11) {
        text = `お子さんは10歳です。 \n11歳の誕生日まであと${
            4015 - score * 11 
        }文字です。`;
    } else if (score * 11 / 365 < 12) {
        text = `お子さんは11歳です。 \n12歳の誕生日まであと${
            4380 - score * 11 
        }文字です。`;
    } else if (score * 11 / 365 < 13) {
        text = `お子さんは12歳です。 \n13歳の誕生日まであと${
            (4745 - score * 11)/11
        }文字です。`;
    } else if (score * 11 / 365 >= 13) {
        text = `お子さんが中学生になりました。\nご入学おめでとうございます!`;
    }

    // 生成したメッセージと一緒に文字列を返す
    return `${text}\n正答率は${Math.floor(score/(score+wrong)*100)}%でした。\nタイプした文字:\n${typedWords}`;

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