const AWS = require('aws-sdk')

module.exports = function (tableName) {
  return new AWS.DynamoDB({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    params: {
      TableName: tableName
    }
  })
}
