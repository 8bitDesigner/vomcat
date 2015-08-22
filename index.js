require("babel/register");

var express = require('express')
  , path = require('path')
  , server = express()
  , port = process.env.PORT || 3001
  , redis = require('./lib/redis')()
  , VomModel = require('./lib/voms')
  , voms = new VomModel(redis)
  , App = require('./app')

// view engine setup
server.set('views', path.join(__dirname, 'app', 'views'));
server.set('view engine', 'ejs');

// Set up heroku heartbeet
// require('./lib/keepalive')(server, { route: 'keepalive', timeout: 600000 })

// Serve static assets
server.use(express.static('app/public' /*, { maxAge: 86400000 } */));
server.use(express.static('node_modules/bootstrap/dist', { maxAge: 86400000 }));

// Serve errything else
server.get('/', function(req, res) {
  voms.get(function(err, dates) {
    app = new App(dates)

    res.render('index', {
      title: 'Vomcat',
      markup: app.start(),
      data: JSON.stringify(dates)
    })
  })

})

server.get('/voms', function(req, res) {
  voms.get(function(err, dates) {
    if (err) { return next(err) }
    res.send(dates)
  })
})

server.put('/voms', function(req, res) {
  voms.create(function(err) {
    if (err) { return next(err) }
    res.status(204).send()
  })
})

server.delete('/voms/:timestamp', function(req, res) {
  voms.remove(req.params.timestamp, function(err) {
    if (err) { return next(err) }
    res.status(204).send()
  })
})

server.use(function(err, req, res, next) {
  res.render('error', {message: err.message, error: err})
})

server.listen(port, function() {
  console.log('Now listening on port ', port)
})

