all: test

setup:
	npm install mocha

test:
	node_modules/mocha/bin/mocha
