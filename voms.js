const AWS = require('aws-sdk')
const TableName = process.env.DYNAMODB_TABLE
const VomsModel = require('./lib/voms-dynamo.js')
const connector = new AWS.DynamoDB({params: {TableName}})
const voms = new VomsModel(connector)

function respond (statusCode, body) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Requested-With,X-Requested-By,X-Api-Key',
    'Access-Control-Allow-Origin': 'http://localhost:3001'
  }

  if (body) {
    headers['Content-Type'] = 'application/json'
  }

  return {
    statusCode,
    headers,
    body: body ? JSON.stringify(body) : undefined
  }
}

module.exports.list = function (event, context, callback) {
  voms.get(function (err, dates) {
    err ? callback(err) : callback(null, respond(200, dates))
  })
}

module.exports.create = function (event, context, callback) {
  voms.create(function (err) {
    err ? callback(err) : callback(null, respond(204))
  })
}

module.exports.destroy = function (event, context, callback) {
  const timestamp = event.pathParameters.id
  voms.remove(timestamp, function (err) {
    err ? callback(err) : callback(null, respond(204))
  })
}
