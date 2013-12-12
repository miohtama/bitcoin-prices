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
 */

(function($) {

    "use strict";

    var config = window.bitcoinAverage;

    if(!config.url) {
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
        $.json(config.url, function(resp) {
            data = resp;
            updatePricesStatus();
        });
    }

    /**
     * Assume we have market data available.
     *
     * Update the prices to reflect the current state of
     */
    function updatePrices() {

    }

    $(document).ready(function() {
        loadData();
    });

})(jQuery);