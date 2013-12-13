/**
 * bitcoinaverage.js
 *
 * Display human-friendly bitcoin prices, both desktop and mobile.
 *
 * Make BTC prices clickable and convert them to different currencies in-fly.
 * Uses bitcoinaverage.com API for exchange rates data.
 * Requires jQuery + Bootstrap.js for fully functionality.
 *
 * Copyright 2013 Mikko Ohtamaa http://opensourcehacker.com
 *
 * Licensed under MIT license.
 */

(function($) {

    "use strict";

    var config = window.bitcoinAverage;

    if(!config || !config.url) {
        throw new Error("bitcoinaverage.js not configured properly");
    }

    var data = null;

    var bitcoinprice = {

        /**
         * Update market rate data from the server using JSON AJAX request.
         *
         * Assumes the server sets proper cache headers, so we are not bombing
         * the server.
         */
        loadData : function () {

            var self = this;

            $.getJSON(config.url, function(resp) {
                data = resp;
                $(document).tigger("marketdataavailable");
            });
        },

        /**
         * Convert between BTC and fiat currecy.
         */
        convert : function(amount, sourceCurrency, targetCurrency)  {

        },

        /**
         * Get the currency selected by the user.
         */
        getActiveCurrency : function() {
            return window.localStorage["bitcoinaverage.currency"] || config.defaultCurrency || "BTC";
        },

        /**
         * Loop available currencies, select next one.
         *
         * @return {String} user-selected next three-letter currency code
         */
        toggleNextActiveCurrency : function() {

            var currency = getActiveCurrency();
            var idx = $.inArray(currency, config.currencies);
            if(idx < 0) {
                idx = 0;
            }
            idx = (++idx) % config.currencies.length;

            currency = window.localStorage["bitcoinaverage.currency"] = config.currencies[idx];

            return currency;
        },

        /**
         * Format a price for a currency.
         *
         * Fills in currency symbols we have configured.
         *
         * @param  {Number} amount
         * @param  {String} currency three letter currency code
         * @return {String} HTML snippet
         */
        formatPrice : function (amount, currency) {
            var symbols = config.symbols || {};
            var symbol = config.symbols[currency] || currency;
        },

        /**
         * Assume we have market data available.
         *
         * Update the prices to reflect the current state of selected
         * currency and market price.
         */
        updatePrices : function() {

            var self = this;
            var currentCurrency = getActiveCurrency();


            // Find all elements which declare themselves to present BTC prices
            $("[data-btc-price]").each(function() {
                var elem = $(this);
                var btcPrice = elem.attr("data-btc-price");
                try {
                    btcPrice = parseFloat(btcPrice, 10);
                } catch(e) {
                    // On invalid price keep going forward
                    // silently ignoring this
                    return;
                }

                var inCurrentCurrency = convertBTCToCurrency(btcPrice, currentCurrency);

                elem.html(self.formatPrice(inCurrentCurrency, currentCurrency));

            });
        },

        /**
         * User changes the default currency through clicking a price.
         */
        onClickPrice : function() {
            selectNextCurrency();
            updatePrices();
        },

        /**
         * Make prices clickable and tooltippable.
         *
         * Assume we have market data available.
         */
        enableCurrencyChange : function() {
            var self = this;

            // We have now market data available,
            // decoreate elements so the user knows there is interaction
            $("[data-btc-price]").addClass("clickable-price");
            if(config.ux.clickPrices) {
                $(".clickable-price").click(function() { self.onClickPrice(); });
            }

        },


        /**
         * Call to initialize the detault bitcoinprices UI.
         */
        init : function(_config) {

            var self = this;
            config = _config;

            $(document).bind("marketdataavailable", function() {
                self.updatePrices();
                self.enableCurrencyChange();
            });

            this.loadData();
        }
    };

})(jQuery);