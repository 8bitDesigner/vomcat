require('babel/register')

if ((process.env.NODE_ENV || 'development') === 'development') {
  require('dotenv').load()
}

const express = require('express')
const path = require('path')
const server = express()
const port = process.env.PORT || 3001

// view engine setup
server.set('views', path.join(__dirname, 'src', 'views'))
server.set('view engine', 'ejs')

// Serve static assets
server.use('/assets', express.static('build'))

// Serve errything else
server.get('/', function (req, res, next) {
  res.render('index', {title: 'Vomcat'})
})

server.use(function (err, req, res, next) {
  res.render('error', {message: err.message, error: err})
})

server.listen(port, function () {
  console.log('Now listening on port ', port)
})
