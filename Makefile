PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
css   := app/public/css/app.css
js    := app/public/js/app.js
libs  := app/public/js/libs.js

all: $(js) $(css)

clean:
	rm -rf $(css) $(js)

$(libs): $(wildcard node_modules)
	browserify -r ./node_modules/react/dist/react.min.js:react \
             -r ./node_modules/moment/min/moment.min.js:moment \
             > $@

$(js): $(wildcard app/public/jsx/*.jsx) $(libs)
	browserify -x moment -x react $< --extension=.jsx -t babelify -o $@

$(css): app/public/scss/app.scss
	sassc -I node_modules/bootstrap-sass/assets/stylesheets $< $@

watch:
	make && fswatch -0 app/public/scss app/public/jsx | xargs -0 -n1 -I{} make

.PHONY: clean watch
