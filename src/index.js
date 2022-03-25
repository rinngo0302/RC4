
document.getElementById("app").innerHTML = `
<h1>RC4!</h1>
<div>
  内部状態Sbox
</div>
`;

const SPEED = 100;

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

      // cell.firstChild.dataの値を256で割った値で、アルファチャンネルを変える
      cell.style.backgroundColor = `rgba(156, 150, 256, ${parseInt(cell.firstChild.data) / 256})`;
      // console.log(`cell.firstChild: ${cell.firstChild}\ncellText: ${cellText.id}\noldText: ${oldText.id}`);
    }
  }
}

generate_table(); //初期のテーブルを作成，配列sを内部で初期化

// 色を変える(未使用)
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

let i, j;
let hasDoneKSAOnce = false;
function KSA() {
  console.log("in KSA");

  if (!hasDoneKSAOnce)
  {
    i = 0;
    j = 0;

    hasDoneKSAOnce = true;
  }

  j += s[i] + K[i % K.length];
  j %= 256;

  // console.log(`i: ${i}\nj: ${j}`);
  // changeColor(i, j);

  var x = s[i]; // 要素の入れ替え
  s[i] = s[j];
  s[j] = x;

  showArray(s);

  if (i >= 255) {
    console.log("KSA Stop!");
    alert("KSA finish!!");
    hasDoneKSA = true; // PRGB()を実行する
  }
  i++;
}

let hasDonePRGAOnce = false;
function PRGA(plain) {
  console.log("in PRGA");
  
  if (!hasDonePRGAOnce)
  {
    i = 1;
    j = 0;

    hasDonePRGAOnce = true;
  }
  
  i %= 256;
  j = (j + s[i]) % 256;
  let x = s[i];
  s[i] = s[j];
  s[j] = x;

  z.push(s[(s[i] + s[j]) % 256]);
  // console.log(`i: ${i}\nj: ${j}`);

  // changeColor(i, j); // 色変更
  showArray(s); // tableに表示

  
  if (i > plain.length) {
    hasDonePRGA = true;
  }
  
  i++;
  
}

let hasSetData = false;
let hasDoneKSA = false;
let hasDonePRGA = false;
let plain = new Array();
function RC4() {
  if (!hasSetData)
  {
    let plainEl = document.getElementById("plain");
    let getc = "";
    for (let i = 0; i <= plainEl.value.length; i++)
    {
      if (plainEl.value[i] === "," || i === plainEl.value.length)
      {
        console.log(getc);
        plain.push(parseInt(getc));
        getc = "";
      } else {
        getc += plainEl.value[i];
      }
    }
  
    let keyEl = document.getElementById("key");
    getc = "";
    for (let i = 0; i <= keyEl.value.length; i++)
    {
      if (keyEl.value[i] === "," || i === keyEl.value.length)
      {
        console.log(getc);
        K.push(parseInt(getc));
        getc = "";
      } else {
        getc += keyEl.value[i];
      }
    }
    console.log(`Key: ${K}\nPlain: ${plain}`);

    hasSetData = true;
  }
  if (!hasDoneKSA)
  {
    KSA();
  } else if(!hasDonePRGA) {
    PRGA(plain);
  } 
  if (hasDonePRGA) {
    // 暗号化終了
    console.log("PRGA Stop!");
    alert("PRGA finish!!");
  
    console.log(z);
  
    let out = new Array(plain.length); // 結果を記憶する変数
    for (let i = 0; i < plain.length; i++) {
      // 全ての要素をXORする
      out[i] = plain[i] ^ z[i];
    }
    console.log(out); // 結果を出力!
  
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = `result: ${out}`;

  }
}

//RC4([10, 50, 65, 855, 10], [7, 50, 64, 485, 468, 45621313, 454, 1, 312, 8979]);
showArray(s); //ｓを表示

showArray(s);
