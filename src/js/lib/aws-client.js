import AWS from 'aws-sdk'

export default function (accessToken, TableName) {
  AWS.config.region = process.env.region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.cognito.poolId,
    Logins: {'graph.facebook.com': accessToken}
  })

  window.aws = AWS

  return new AWS.DynamoDB.DocumentClient({
    params: { TableName }
  })
}
