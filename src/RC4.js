function swap(arr, a, b)
{
  let tmpB = arr[b];
  arr[b] = arr[a];
  arr[a] = tmpB;
  return arr;
}

let hasSetData = false;
let hasDoneKSA = false;
let hasDonePRGA = false;
let plain = new Array();
function RC4() {
  if (!hasSetData)
  {
    let plainEl = document.getElementById("plain");
    let plainText = plainEl.value;

    for (let i = 0; i < plainText.length; i++)
    {
      plain.push(plainText[i].charCodeAt());
    }
  
    let keyEl = document.getElementById("key");
    let keyText = keyEl.value;
    getc = "";
    for (let i = 0; i < keyText.length; i++)
    {
      K.push(keyText[i].charCodeAt());
    }
    console.log(`
Data:
  Text:
    Key: ${keyText}
    Plain: ${plainText}
  Number:
    Key: [${K}]
    Plain: [${plain}]`);

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
    console.log("PRGA finish!");
    alert("PRGA finish!!");
    
    let out = new Array(plain.length); // 結果を記憶する変数
    for (let i = 0; i < plain.length; i++) {
      // 全ての要素をXORする
      out[i] = plain[i] ^ z[i];
    }
    let outText = new String();
    for (let i = 0; i < out.length; i++)
    {
      outText += String.fromCharCode(out[i]);
    }
  
    let resultEl = document.getElementById("result");
    console.log(`result: ${outText}`);
    resultEl.value = `${outText}`;

  }
}

let i, j;
let hasDoneKSAOnce = false;
function KSA() {
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

  if (i > 255) {
    // 初期化終了
    console.log("KSA finish!!");
    alert("KSA finish!!");
    hasDoneKSA = true; // PRGB()を実行する
  }
  i++;
}

let hasDonePRGAOnce = false;
function PRGA(plain) {
  
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

function AutoRC4()
{
  while (!hasDonePRGAOnce && !hasDoneKSA)
  {
    RC4();
  }

  for (let i = 0; i < 3; i++)
    RC4();
}

function initialize()
{
  hasSetData = false;
  hasDoneKSA = false;
  hasDonePRGA = false;
  hasDoneKSAOnce = false;
  hasDonePRGAOnce = false;
  i = 0; j = 0;
  K = Array();
  plain = Array();
  
  for (let i = 0; i < 256; i++)
  {
    s[i] = i;
    document.getElementById(i).id = i;
  }

  showArray(s);

  console.log("初期化完了!!");
}