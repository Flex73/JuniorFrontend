for (var list = 1; list <= 100; list++) {
    var exception = "";
    if (list % 3 == 0)
        exception = exception + "Fizz";
    if (list % 5 == 0)
        exception = exception + "Buzz";
    console.log (exception || list);
}