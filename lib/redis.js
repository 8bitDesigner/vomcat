var redis = require("redis")
  , parser = require("url").parse
  , client

if (process.env.REDISTOGO_URL) {
  let url = parser(process.env.REDISTOGO_URL)
    , pass = url.auth.split(':').pop()

  client = redis.createClient(url.port, url.hostname)
  client.auth(pass)
} else {
  client = redis.createClient();
}

module.exports = function(db) {
  client.select(db || process.env.REDISTOGO_DB || 1)
  return client
}
