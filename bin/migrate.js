require('dotenv').load()

const redis = require('../lib/redis')()
const RedisVoms = require('../lib/voms')
const redisVoms = new RedisVoms(redis)
const dynamoVoms = require('../lib/voms-dynamo')

function toDynamoVom (vom) {
  const date = new Date(vom)
  const now = new Date()

  return dynamoVoms.putItem({
    year: date.getFullYear(),
    vom_date: date,
    created_at: now,
    reporter: 'migration script'
  })
}

redisVoms.get((err, voms) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    const promises = voms.map(toDynamoVom)
    console.log('voms', voms.length)

    return Promise.all(promises)
    .catch(err => console.error(err))
    .then(() => {
      dynamoVoms.get((err, voms) => {
        err ? console.error(err) : console.log(voms)
      })
    })
  }
})
