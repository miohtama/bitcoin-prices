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

    /**
     * Update market rate data from the server using JSON AJAX request.
     *
     * Assumes the server sets proper cache headers, so we are not bombing
     * the server.
     */
    function loadData() {

        $.getJSON(config.url, function(resp) {
            data = resp;
            updatePrices();
            enableCurrencyChange();
        });
    }


    /**
     * User changes the default currency through clicking a price.
     */
    function onClickPrice() {
        selectNextCurrency();
        updatePrices();
    }

    /**
     * Make prices clickable and tooltippable.
     *
     * Assume we have market data available.
     */
    function enableCurrencyChange() {
        // We have now market data available,
        // decoreate elements so the user knows there is interaction
        $("[data-btc-price]").addClass("clickable-price");

        $(".clickable-price").click(onClickPrice);
    }

    function convertBTCToCurrency(amount, currency) {

    }

    /**
     * Get currency selected by the user.
     */
    function getCurrentCurrency() {
        return window.localStorage["bitcoinaverage.currency"] || config.defaultCurrency || "BTC";
    }

    /**
     * Loop available currencies, select next one.
     *
     * @return {String} user-selected next currency code
     */
    function selectNextCurrency() {

        var currency = getCurrentCurrency();
        var idx = $.inArray(currency, config.currencies);
        if(idx < 0) {
            idx = 0;
        }
        idx = (++idx) % config.currencies.length;

        currency = window.localStorage["bitcoinaverage.currency"] = config.currencies[idx];

        return currency;
    }

    function formatPrice(amount, currency) {
        var symbols = config.symbols || {};
        var symbol = config.symbols[currency] || currency;

    }

    /**
     * Assume we have market data available.
     *
     * Update the prices to reflect the current state of selected
     * currency and market price.
     */
    function updatePrices() {
        var currentCurrency = getCurrentCurrency();

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

            elem.html(formatPrice(inCurrentCurrency, currentCurrency));

        });
    }

    $(document).ready(function() {
        loadData();
    });

})(jQuery);