const noop = function () {}

module.exports = class Voms {
  constructor (redis, key = 'voms') {
    this.redis = redis
    this.key = key
    this.noop = function () {}
  }

  get (done = noop) {
    this.redis.smembers(this.key, (err, voms) => {
      done(err, voms.map(v => new Date(+v)))
    })
  }

  create (...args) {
    const done = args.pop()
    const date = args.pop() || new Date()

    this.redis.sadd(this.key, date.valueOf(), (err, length) => {
      err ? done(err, null) : done(null, length > 0)
    })
  }

  remove (date, done = noop) {
    var strDate = new Date(date).valueOf().toString()

    this.redis.srem(this.key, strDate, (err, length) => {
      err ? done(err, null) : done(null, length > 0)
    })
  }
}

