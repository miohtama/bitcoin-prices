
## Introduction

**bitcoinprices.js** is a JavaScript library for presenting Bitcoin prices with currency conversion.

Example:


![image](https://raw.github.com/miohtama/bitcoin-prices/master/example.gif)


## Features

* Sourcing data from [bitcoinaverage.com exchange rate market data API](http://bitcoinaverage.com)
* Easy to place on any web page and Bitcoin store
* Web and mobile friendly
* Integrates with [Bootstrap](http://getbootstrap.com) front-end framework
* Integrates with [Font Awesome](http://fortawesome.github.io/) icon font
* Change currency through a dropdown menu
* Change currency by clicking / touching a price on the page
* Manual currency conversions
* [npm packaged for browserify consumption](https://www.npmjs.org/package/bitcoinprices).

See also

* [Liberty Music Store is an online store which allows musicians to sell their songs and receive Bitcoins.](https://libertymusicstore.net/). The source code of Liberty Music Store is [on Github](https://github.com/miohtama/LibertyMusicStore), so you can check it for the integration example.

* The sister project [bitcoinaaddress.js for making bitcoin payments and QR codes](https://github.com/miohtama/bitcoinaddress.js).

## Demos

[Demo with clickable bitcoin prices, bitcoin price menu and manu bitcoin price conversion](http://miohtama.github.com/bitcoin-prices/index.html).

[BitWatcher](http://bitwatcher.me/)


## Installation

No server-side components needed.

You must have [jQuery](http://jquery.com) (version 1.9 or later) installed.

Put `bitcoinprices.js` in your application.

You manually need to call `bitcoinprices.init()` to trigger the loading of exchange rate data and
making price switching logic to work:


```html
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

                // Allow user to cycle through currency choices in currency:

                clickableCurrencySymbol:  true
            },

            // Allows passing the explicit jQuery version to bitcoinprices.
            // This is useful if you are using modular javascript (AMD/UMD/require()),
            // but for most normal usage you don't need this
            jQuery: jQuery,

            // Price source data attribute
            priceAttribute: "data-btc-price",

            // Price source currency for data-btc-price attribute.
            // E.g. if your shop prices are in USD
            // but converted to BTC when you do Bitcoin
            // checkout, put USD here.
            priceOrignalCurrency: "BTC"

        });
    });
</script>
```

All configuration parameters can be omitted. Then defaults from bitcoinprices.js
is used (`defaultConfig` variable).


## How it works

Your templating language must output Bitcoin prices with  attribute:


```html
<p>
    <div>Example price: <span data-btc-price="1.0">1.0 BTC</span></div>
</p>
```


* You manually initialize the library with  and give it a config you want to use,
    including bitcoinaverage.com API URL. See the demo for an example.
* `bitcoinprices.init()` fires HTML document `marketdataavailable` event when the script manages to load
    exchange rates
* Whenever the user changes price presentation format HTML document `activecurrencychange` event is fired
* You can manually call `bitcoinprices.convert()` to convert between any currencies supported
    by bitcoinaverage.com
* You can manually call call `bitcoinprices.updatePrices()` if your own JavaScripts
    sets the active currency and all prices on the page are updatd.

It is suggested that you cache bitcoinaverage.com API output on a local server with proper
cache headers. This may considerably speed up your site and reduces bitcoinaverage.com load.

## Drupal and UberCart integration

Here is another example how `bitcoinprices.js` is used
with popular [Drupal](https://drupal.org) content management system and its [UberCart](https://drupal.org/project/ubercart) eCommerce add on.

An example live site, [It's time for plan B](http://timeforplanb.org/store/).


### Integration instructions

Change UberCart templates to output price as `data-price-usd` attribute.

Example modification to `node--production.tpl.php`:


```html
$usd_price = round(render($content['sell_price']['#value']) , 2);

<span data-price-usd="<?=$usd_price ?>"><?=$usd_price ?></span>
```

Include `bitcoinprices.js` in your CSS.

Add CSS styles for `.clickable-price` selector (prices become clickable only when succesful market data
exchange rates have been downloaded from bitcoinaverage). `clickable-price` CSS class is added
automatically you don't need to add it to your templates:


```css
.clickable-price {
    cursor: pointer;
    border-bottom: 1px #888 dashed;
}
```

Include an initialization JavaScript snippet as a separate JS file:


```javascript
/**
 * Drupal + Ubercart integration for bitcoinprices.js
 *
 * Make Bitcoin prices clickable, based on the dollar amount.
 *
 * Scan document for elements with `data-price-usd` attributes,
 * make them clickable.
 */

(function($) {

    // Entry point to processing
    $(document).ready(function() {

        bitcoinprices.init({

            // Which currencies are in shown to the user
            currencies: ["BTC", "USD", "EUR", "CNY"],

            // Which currency we show user by the default if
            // no currency is selected
            defaultCurrency: "USD",

            // How the user is able to interact with the prices
            ux : {
                // Make everything with data-btc-price HTML attribute clickable
                clickPrices : true,

                // Build Bootstrap dropdown menu for currency switching
                menu : false,
            },

            // Allows passing the explicit jQuery version to bitcoinprices.
            // This is useful if you are using modular javascript (AMD/UMD/require()),
            // but for most normal usage you don't need this
            jQuery: $,

            // Which HTML attribute hosts the price data and
            // makes elements clickable
            priceAttribute: "data-price-usd",

            // Which is the source currency for the prices
            priceOrignalCurrency: "USD"
        });
    });

})(jQuery);
```


## Author

Mikko Ohtamaa ([blog](https://opensourcehacker.com), [Facebook](https://www.facebook.com/?q=#/pages/Open-Source-Hacker/181710458567630), [Twitter](https://twitter.com/moo9000), [Google+](https://plus.google.com/u/0/103323677227728078543/))

Contact for work and consulting offers.

