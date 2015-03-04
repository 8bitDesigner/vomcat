PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
css   := app/public/css/app.css
js    := app/public/js/app.js

all: $(js) $(css)

clean:
	rm -rf $(css) $(js)

$(js): app/public/jsx/app.jsx
	browserify $< -t babelify -o $@

$(css): app/public/scss/app.scss
	sassc -I node_modules/bootstrap-sass/assets/stylesheets $< $@

watch:
	fswatch -0 app/public/scss/* | xargs -0 -n1 make app/public/css/app.css & fswatch -0 app/public/jsx/* | xargs -0 -n1 make app/public/js/app.js

.PHONY: clean watch
