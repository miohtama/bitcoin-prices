BIN=node_modules/.bin

all: clean test distribution

# What we need to test and build distro
setup:
	npm install .

clean:
	rm dist/* > /dev/nul

distribution:
	$(BIN)/browserify bitcoinprices.js > dist/bitcoinprices.js
	$(BIN)/browserify bitcoinprices.js | $(BIN)/uglifyjs > dist/bitcoinprices.min.js

test:
	$(BIN)/mocha-phantomjs tests/tests.html

publish:
	echo "Just run $(BIN)/npm-release <newversion>"