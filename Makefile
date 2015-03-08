PATH     := node_modules/.bin:$(PATH)
SHELL    := /bin/bash
css      := app/public/css/app.css
js       := app/public/js/app.js
jsentry  := app/index.jsx
cssentry := app/public/scss/app.scss

define jsbuild
  --extension=.jsx \
  -t babelify \
  -r ./node_modules/react/dist/react.min.js:react \
  -r ./node_modules/moment/min/moment.min.js:moment \
  -e $(jsentry) \
  -o $(js)
endef

all: $(js) $(css)

clean:
	rm -rf $(dir $(css))* $(dir $(js))*

$(css): $(cssentry)
	sassc -I node_modules/bootstrap-sass/assets/stylesheets $< $@

$(js): $(shell find app/ -name '*.jsx')
	browserify $(jsbuild) --verbose

test:
	mocha --require babel/register --recursive test

watch.js: $(shell find app/ -name '*.jsx')
	watchify $(jsbuild) --verbose

watch.css: $(cssentry)
	fswatch -0 $(dir $(cssentry)) | xargs -0 -n1 -I{} make $(css)

watch.test:
	mocha --watch --require babel/register --recursive test

server:
	supervisor --ignore app/public -e 'js,ejs' index.js

develop: all server watch.css watch.js watch.test

.PHONY: clean test watch.css watch.js watch.test
