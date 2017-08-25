const AWS = require('aws-sdk')
const VomsModel = require('./voms-dynamo.js')
const TableName = process.env.DYNAMODB_TABLE
const connector = new AWS.DynamoDB({params: {TableName}})

exports.voms = new VomsModel(connector)

exports.respond = function respond (statusCode, body) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Requested-With,X-Requested-By,X-Api-Key',
    'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN
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

