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

  if (i > 255) {
    // 初期化終了
    console.log("KSA Stop!");
    alert("KSA finish!!");
    hasDoneKSA = true; // PRGB()を実行する
    console.log("in PRGA");
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
