const connector = require('./dynamo/connector.js')
const DynamoTable = require('./dynamo/table.js')

const noop = function () {}

class Voms extends DynamoTable {
  get (callback = noop) {
    return this.scan({
      ConsistentRead: true,
      ProjectionExpression: 'vom_date'
    })
    .then(items => items.map(item => new Date(item.vom_date)).reverse())
    .then(dates => callback(null, dates))
    .catch(err => callback(err))
  }

  create (callback = noop) {
    const now = new Date()
    const payload = {
      year: now.getFullYear(),
      created_at: now,
      updated_at: now,
      vom_date: now,
      reporter: 'API'
    }

    return this.putItem(payload)
    .then(response => callback(null, response))
    .catch(err => callback(err))
  }

  remove (date, callback = noop) {
    return this.deleteItem({date})
    .then(response => callback(null, response))
    .catch(err => callback(err))
  }
}

module.exports = new Voms(
  connector('voms'),
  {
    year: 'N',
    created_at: 'N',
    updated_at: 'N',
    vom_date: 'N',
    reporter: 'S'
  }
)
