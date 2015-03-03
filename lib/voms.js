export default class Voms {
  constructor(redis, key = 'voms') {
    this.redis = redis
    this.key = key
    this.noop = function() {}
  }

  get(done = noop) {
    this.redis.smembers(this.key, (err, voms) => {
      done(err, voms.map(function(v) { return new Date(+v) }))
    })
  }

  create(...args) {
    var done = args.pop()
      , date = args.pop() || new Date()

    this.redis.sadd(this.key, date.valueOf(), (err, length) => {
      if (err) { done(err, null)        }
      else     { done(null, length > 0) }
    })
  }

  remove(date, done = noop) {
    var strDate = new Date(date).valueOf().toString()

    this.redis.srem(this.key, strDate, (err, length) => {
      if (err) { done(err, null)        }
      else     { done(null, length > 0) }
    })
  }
}

