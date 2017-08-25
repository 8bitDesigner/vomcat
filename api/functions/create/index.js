const shared = require('./lib/lambda-utils.js')

exports.handle = function (event, context, callback) {
  shared.voms.create(function (err) {
    err ? callback(err) : callback(null, shared.respond(204))
  })
}

