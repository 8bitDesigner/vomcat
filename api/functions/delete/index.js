const shared = require('./lib/lambda-utils.js')

exports.handle = function (event, context, callback) {
  const timestamp = event.pathParameters.id
  shared.voms.remove(timestamp, function (err) {
    err ? callback(err) : callback(null, shared.respond(204))
  })
}

