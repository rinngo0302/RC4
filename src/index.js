document.getElementById("app").innerHTML = `
<h1>RC4!</h1>
<div>
  内部状態Sbox
</div>
`;

let K = new Array();
let z = new Array();

//本当は関数をindex.htmlから呼び出して表を表示したい
//generate_table();
//var x = getSvalue(0);
//console.log(x);
//document.getElementById("svalue").innerHTML = x;

const rowmax = 16;
const columnmax = 16;
var s = new Array(rowmax * columnmax);

function generate_table() {
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // creating all cells
  for (var i = 0; i < rowmax; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < columnmax; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      var cellText = document.createTextNode(i * columnmax + j);
      cell.appendChild(cellText);
      cell.setAttribute("id", (i * columnmax + j));
      row.appendChild(cell);
      s[i * columnmax + j] = i * columnmax + j;
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "1");
  // tableにid=sboxを設定
  tbl.setAttribute("id", "s");
}

function showArray(a) {
  for (var i = 0; i < rowmax; i++) {
    for (var j = 0; j < columnmax; j++) {
      var index = i * rowmax + j;
      var cell = document.getElementById(index);
      var cellText = document.createTextNode(a[i * columnmax + j]);
      var oldText = cell.firstChild; //今表示されている要素
      cell.replaceChild(cellText, oldText); //domの要素を入れ替え

      let oldId = parseInt(oldText.id);
      console.log(oldId);
    }
  }
}

generate_table(); //初期のテーブルを作成，配列sを内部で初期化

// 色を変える
function changeColor(num1, num2) {
  // 全ての色の初期化
  for (let i = 0; i < s.length; i++) {
    document.getElementById(`p${i}`).style.backgroundColor = "white";
  }

  // 入れ替える要素を取得
  let el1 = document.getElementById(`p${num1}`);
  let el2 = document.getElementById(`p${num2}`);
  // 色を変更
  el2.style.backgroundColor = "#FF9B98";
  el1.style.backgroundColor = "#FF9B98";
}

function KSA() {
  console.log("in KSA");
  let i = 0;
  var j = 0;

  let timerID = setInterval(() => {
    j += s[i] + K[i % K.length];
    j %= 256;

    changeColor(i, j);

    var x = s[i]; // 要素の入れ替え
    s[i] = s[j];
    s[j] = x;

    showArray(s);

    if (i >= 255) {
      // 初期化終了
      console.log("KSA Stop!");
      clearInterval(timerID);
      hasDoneKSA = true; // PRGB()を実行する
    }
    i++;
  }, 80);
}

function PRGA(plain) {
  console.log("in PRGA");

  let i = 1;
  let j = 0;

  let timerID = setInterval(() => {
    // setIntervalは、
    // 処理をとめずに繰り返すのを予約するだけなので、
    // KSA()が終わるのを待つ
    if (hasDoneKSA) {
      i %= 256;
      j = (j + s[i]) % 256;
      let x = s[i];
      s[i] = s[j];
      s[j] = x;

      z.push(s[(s[i] + s[j]) % 256]);

      changeColor(i, j); // 色変更
      showArray(s); // tableに表示

      if (i >= plain.length) {
        // 暗号化終了
        console.log("PRGA Stop!");
        clearInterval(timerID);

        console.log(z);

        // きちんとRC4()でしたかった
        let out = new Array(plain.length); // 結果を記憶する変数
        for (let i = 0; i < plain.length; i++) {
          // 全ての要素をXORする
          out[i] = plain[i] ^ z[i];
        }
        console.log(out); // 結果を出力!
      }

      i++;
    }
  }, 100);
}

let hasDoneKSA = false;

function RC4(key, text) {
  K = key;
  KSA();
  PRGA(text);
}

//RC4([255, 1, 0, 255, 1, 0, 255, 1, 0, 255, 1, 0, 255, 1, 0], [174, 50, 89]);

showArray(s); //ｓを表示

s[0] = 1;
s[1] = 0;

showArray(s);