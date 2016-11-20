let util = require('./main');
let should = require('should');

describe('test/main.test.js', function () {
    it('should equal 0 when n === 0', function() {
        util.fibonacci(0).should.equal(0);
    });
    it('should equal 1 when n === 1', function() {
        util.fibonacci(1).should.equal(1);
    });
    it('should equal 55 when n === 10', function() {
        util.fibonacci(10).should.equal(55);
    });
    it('should throw when n > 10', function() {
        (function() {
            util.fibonacci(11)
        }).should.throw('n should <= 10');
    });
    it('should throw when n < 0', function() {
        (function() {
            util.fibonacci(-1)
        }).should.throw('n should >= 0');
    });
    it('should throw when n is not a number', function() {
        (function() {
            util.fibonacci('dream')
        }).should.throw('n should be a number');
    });
});