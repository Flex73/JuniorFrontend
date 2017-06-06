function isEven (a) {
    if (a == 0)
    return true;
    else if (a == 1)
    return false;
    else if (a < 0)
    return isEven(-a);
    else 
    return isEven(n - 2);
}

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));