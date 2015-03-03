var redis = require("redis")
  , client = redis.createClient()

module.exports = function(db) {
  client.select(db || 1)
  return client
}
