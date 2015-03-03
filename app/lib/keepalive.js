var http = require('http')
  , noop = function() {}
  , server = process.env.HEROKUAPP_URL

export default function(app, opts = {}) {
  var {route, timeout} = opts
  if (!timeout) timeout = 300000

  app.get(`/${route}`, function(req, res) {
    res.sendStatus(205)
  })

  if (server) {
    setInterval(function() { http.get(server + route, noop) }, timeout)
  }
}
