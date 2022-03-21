function swap(arr, a, b)
{
  let tmpB = arr[b];
  arr[b] = arr[a];
  arr[a] = tmpB;
  return arr;
}

function KSA(k)
{
    let j = 0;
    for (let i = 0; i < 256; i++)
    {
      j += s[i] + k[i % 256].charAtCode();
      j %= 256;
      s = swap(s, i, j);
    }
}

function RGBA()
{
  
}

function RC4()
{

}