
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

//RC4([10, 50, 65, 855, 10], [7, 50, 64, 485, 468, 45621313, 454, 1, 312, 8979]);
showArray(s); //ｓを表示

showArray(s);
