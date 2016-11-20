let fibonacci = function(n) {
    if('number' !== typeof n) {
        throw new Error('n should be a number');
    }
    if(0 > n) {
        throw new Error('n should >= 0');
    }
    if(0 === n) {
        return 0;
    }
    if(1 === n) {
        return 1;
    }
    if(10 < n) {
        throw new Error('n should <= 10');
    }
    return fibonacci(n-1) + fibonacci(n-2);
};

if(module === require.main) {
    let n = Number(process.argv[2]);
    console.log('fibonacci(' + n + ') = ' + fibonacci(n));
}

exports.fibonacci = fibonacci;