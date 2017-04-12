const AWS = require('aws-sdk')
const VomsModel = require('./../../../lib/voms-dynamo.js')

console.log(process)

const connector = new AWS.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  params: {
    TableName: process.env.DYNAMODB_TABLE
  }
})
const voms = new VomsModel(connector)

export default class Voms {
  get (callback) {
    voms.get(function (err, dates) {
      err ? callback(err) : callback(null, dates)
    })
  }

  create (callback) {
    voms.create(function (err) {
      err ? callback(err) : callback(null)
    })
  }
}

