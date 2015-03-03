require("babel/register");

var express = require('express')
  , path = require('path')
  , app = express()
  , port = process.env.PORT || 3001
  , redis = require('./app/lib/redis')
  , Voms = require('./app/lib/voms')
  , voms = new Voms(redis())

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'ejs');

// Serve static assets
app.use(express.static('app/public' /*, { maxAge: 86400000 } */));
app.use(express.static('node_modules/bootstrap/dist', { maxAge: 86400000 }));

// Serve errything else
app.get('/', function(req, res) {
  res.render('index', {title: 'Vomcat'})
})

app.get('/voms', function(req, res) {
  voms.get(function(err, voms) {
    if (err) { return next(err) }
    res.send(voms)
  })
})

app.put('/voms', function(req, res) {
  voms.create(function(err) {
    if (err) { return next(err) }
    res.status(204).send() 
  })
})

app.delete('/voms/:timestamp', function(req, res) {
  voms.remove(req.params.timestamp, function(err) {
    if (err) { return next(err) }
    res.status(204).send() 
  })
})

app.get('/healthcheck', function() {
  console.log('beat')
  res.send(205)
})

app.use(function(err, req, res, next) {
  res.render('error', {message: err.message, error: err})
})

app.listen(port, function() {
  console.log(process.env)
  console.log('Now listening on port ', port)
})

