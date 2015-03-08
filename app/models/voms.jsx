var request = require('browser-request')
  , noop = function() {}

export default class Voms {
  get(done = noop) {
    request({ method: "GET", uri: "/voms", json: true }, (err, req, body) => {
      done(err, voms.map(function(v) { return new Date(+v) }))
    })
  }

  create(...args) {
    var done = args.pop() || noop
      , date = args.pop() || new Date()

    request.put('/voms', (err, res, body) => {
      if (err) { done(err, null)  }
      else     { done(null, true) }
    })
  }

  remove(date, done = noop) {
    var strDate = new Date(date).valueOf().toString()

    request({ method: "DELETE", uri: `/voms/${strDate}`, json: true }, (err) => {
      if (err) { done(err, null)        }
      else     { done(null, true) }
    })
  }
}


