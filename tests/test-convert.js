// Tests based on example
// https://github.com/substack/mocha-testling-ci-example/blob/master/test/beep.js

var DATA = {
    "USD": {
        "24h_avg": 0.5,
        "ask": 0.5,
        "bid": 0.5,
        "last": 0.5,
        "total_vol": 0
    }
};

var expect = chai.expect;

describe('bitcoinprices', function () {

    // Headless setup
    bitcoinprices.init({
        url: null,
        marketRateVariable: "24h_avg",
        currencies: ["BTC", "USD", "EUR", "CNY"],
        defaultCurrency: "BTC",
        ux : {
            clickPrices : false,
            menu : false
        }
    });

    // Spoof bitcoin rates
    function spoofRates() {
        bitcoinprices.data = DATA;
    }

    it('Should give correct conversion from USD to BTC and back', function (done) {
        spoofRates();
        var val = bitcoinprices.convert(1.0, "USD", "BTC");
        expect(val).to.equal(2.0);

        val = bitcoinprices.convert(1.0, "BTC", "USD");
        expect(val).to.equal(0.5);
        done();
    });
});