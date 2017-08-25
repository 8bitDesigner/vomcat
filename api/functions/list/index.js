const shared = require('./lib/lambda-utils.js')

exports.handle = function (event, context, callback) {
  shared.voms.get(function (err, dates) {
    err ? callback(err) : callback(null, shared.respond(200, dates))
  })
}
