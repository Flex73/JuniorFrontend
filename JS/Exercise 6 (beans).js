function countChar(str, ch) {
  var counted = 0;
  for (var i = 0; i < str.length; i++)
    if (str[i] == ch)
      counted += 1;
  return counted;
}

function countBs(str) {
  return countChar(str, "b");
}

console.log(countBs("billboard"));
console.log(countChar("knock", "k"));