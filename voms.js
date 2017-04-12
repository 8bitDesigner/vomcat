const AWS = require('aws-sdk')
const VomsModel = require('./lib/voms-dynamo.js')

const TableName = process.env.DYNAMODB_TABLE
const connector = new AWS.DynamoDB({params: {TableName}})
const voms = new VomsModel(connector)

module.exports.list = function (event, context, callback) {
  voms.get(function (err, dates) {
    err ? callback(err) : callback(null, {statusCode: 200, body: JSON.stringify(dates)})
  })
}

module.exports.create = function (event, context, callback) {
  voms.create(function (err) {
    err ? callback(err) : callback(null, {statusCode: 204})
  })
}

module.exports.destroy = function (event, context, callback) {
  const timestamp = event.pathParameters.id
  voms.remove(timestamp, function (err) {
    err ? callback(err) : callback(null, {statusCode: 204})
  })
}
