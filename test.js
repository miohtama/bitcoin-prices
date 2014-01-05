// Tests based on example
// https://github.com/substack/mocha-testling-ci-example/blob/master/test/beep.js

var assert = require('assert');

var bitcoinprices = require('./bitcoinprices.js');

var DATA = {
    "USD": {
        "24h_avg": 0.5,
        "ask": 0.5,
        "bid": 0.5,
        "last": 0.5,
        "total_vol": 0
    }
};

describe('bitcoinprices', function () {

    // Spoof bitcoin rates
    function spoofRates() {
        bitcoinprices.data = DATA;
    }

    it('Should give correct conversion for USD', function (done) {
        spoofRates();
        var val = convert(1.0, "USD", "BTC");
        assert.equal(val, 0.5);
        done();
    });
});