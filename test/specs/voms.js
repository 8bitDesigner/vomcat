const TEST_DB = 2
var redis = require('../../lib/redis')(TEST_DB)
  , fixture = require('../fixtures/voms')
  , Voms = require('../../lib/voms')
  , assert = require('assert')

function resetRedis(done) {
  var transaction = redis.multi()
  transaction.flushdb()
  transaction.sadd.apply(transaction, ['voms'].concat(fixture))
  transaction.exec(done)
}

describe("Our system of voms", function() {
  beforeEach(resetRedis)

  it("should allow us to get all voms", function(done) {
    let model = new Voms(redis)
    model.get(function(err, voms) {
      assert.equal(err, null)
      assert.equal(voms.length, fixture.length)
      done()
    })
  })

  it("should should give us back date objects", function(done) {
    let model = new Voms(redis)
    model.get(function(err, voms) {
      assert.equal(err, null)
      assert(voms.every(v => { return v instanceof Date }))
      done()
    })
  })

  it("should allow us to create new voms", function() {
    let model = new Voms(redis)
      , now = new Date()

    model.create(now, function(err, wasCreated) {
      assert.equal(err, null)
      assert.ok(wasCreated)

      model.get(function(err, voms) {
        assert.equal(err, null)
        assert.equal(voms.length, fixture.length + 1)
        assert.equal(now.valueOf(), voms[voms.length -1].valueOf())
      })
    })
  })

  it("should allow us to remove voms", function() {
    let model = new Voms(redis)
      , toRemove = fixture[fixture.length - 1]

    model.remove(toRemove, function(err, wasRemoved) {
      assert.equal(err, null)
      assert.ok(wasRemoved)

      model.get(function(err, voms) {
        assert.equal(err, null)
        assert.equal(voms.length, fixture.length - 1)
      })
    })
  })
})

