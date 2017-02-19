const typeMap = {
  S: {
    wrap (val) { return val.toString() },
    unwrap (val) { return val }
  },
  N: {
    wrap (thing) { return thing.valueOf().toString() },
    unwrap (string) { return parseInt(string, 10) }
  }
}

function wrap (object, schema) {
  // Converts
  // {date: '', reporter: ''}
  // To
  // {date: {S: ''}, reporter: {S: ''}
  return Object.keys(object).reduce(function (response, key) {
    const type = schema[key]
    response[key] = {[type]: typeMap[type].wrap(object[key])}
    return response
  }, {})
}

function unwrap (object) {
  // Converts
  // { date: { S: 'Fri Feb 17 2017 22:23:14 GMT-0800 (PST)' }, reporter: { S: 'cli' } }
  // To
  // { date: 'Fri Feb 17 2017 22:23:14 GMT-0800 (PST)', reporter: 'cli' }
  return Object.keys(object).reduce(function (response, key) {
    const type = Object.keys(object[key])[0]
    response[key] = typeMap[type].unwrap(object[key][type])
    return response
  }, {})
}

module.exports = class DynamoTable {
  constructor (connector, schema) {
    this.connector = connector
    this.schema = schema
  }

  run (method, ...args) {
    return new Promise((resolve, reject) => {
      this.connector[method](...args, (err, response) => {
        err ? reject(err) : resolve(response)
      })
    })
  }

  putItem (item) {
    return this.run('putItem', {Item: wrap(item, this.schema)})
  }

  deleteItem (params = {}) {
    return this.run('deleteItem', {Key: wrap(params, this.schema)})
  }

  scan (params = {}) {
    return this.run('scan', params).then(response => response.Items.map(unwrap))
  }

  query (params = {}) {
    return this.run('query', params).then(response => response.Items.map(unwrap))
  }
}

