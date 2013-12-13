.. contents:: :local:

Introduction
---------------

**bitcoinprices.js** is a Javascript library for presenting Bitcoin prices in human-friendly manner.

Example:

.. image :: https://raw.github.com/miohtama/bitcoin-prices/master/example.gif

Features
---------

* Sourcing data from `bitcoinaverage.com exchange rate market data API <http://bitcoinaverage.com>`_

* Easy to place on any web page

* Web and mobile friendly

* Integrates with `Bootstrap <http://getbootstrap.com>`_ front-end framework

* Integrates with `Font Awesome <http://fortawesome.github.io/>`_ icon font

* Change currency through a dropdown menu

* Change currency by clicking / touching a price on the page

* Manual currency conversions

Demos
------

`Demo with clickable bitcoin prices, bitcoin price menu and manu bitcoin price conversion <http://miohtama.github.com/bitcoin-prices/index.html>`_.

Installation
-------------

You must have `jQuery <http://jquery.com>` (version 1.9 or later) installed.

Put ``bitcoinprices.js`` in your application.

You manually need to call ``bitcoinprices.init()`` to trigger the loading of exchange rate data and
making price switching logic to work::

    <script src="bitcoinprices.js"></script>
    <script>
        $(document).ready(function() {
            bitcoinprices.init({

                // Where we get bitcoinaverage data
                url: "https://api.bitcoinaverage.com/ticker/all",

                // Which of bitcoinaverages value we use to present prices
                marketRateVariable: "24h_avg",

                // Which currencies are in shown to the user
                currencies: ["BTC", "USD", "EUR", "CNY"],

                // Special currency symbol artwork
                symbols: {
                    "BTC": "<i class='fa fa-btc'></i>"
                },

                // Which currency we show user by the default if
                // no currency is selected
                defaultCurrency: "BTC",

                // How the user is able to interact with the prices
                ux : {
                    // Make everything with data-btc-price HTML attribute clickable
                    clickPrices : true,

                    // Build Bootstrap dropdown menu for currency switching
                    menu : true,
                }
            });
        });
    </script>

How it works
-----------------

Your templating language must output Bitcoin prices with `data-btc-price` attribute::

        <p>
            <div>Example price: <span data-btc-price="1.0">1.0 BTC</span></div>
        </p>

* You manually initialize the library with `bitcoinprices.init()` and give it a config you want to use,
  including bitcoinaverage.com API URL. See the demo for an example.

* ``bitcoinprices.init()`` fires HTML document ``marketdataavailable`` event when the script manages to load
  exchange rates

* Whenever the user changes price presentation format HTML document ``activecurrencychange`` event is fired

* You can manually call ``bitcoinprices.convert()`` to convert between any currencies supported
  by bitcoinaverage.com

* You can manually call call ``bitcoinprices.updatePrices()`` if your own JavaScripts
  sets the active currency and all prices on the page are updatd.

It is suggested that you cache bitcoinaverage.com API output on a local server with proper
cache headers. This may considerably speed up your site and reduces bitcoinaverage.com load.

Author
------

Mikko Ohtamaa (`blog <https://opensourcehacker.com>`_, `Facebook <https://www.facebook.com/?q=#/pages/Open-Source-Hacker/181710458567630>`_, `Twitter <https://twitter.com/moo9000>`_, `Google+ <https://plus.google.com/u/0/103323677227728078543/>`_)

Contact for work and consulting offers.



