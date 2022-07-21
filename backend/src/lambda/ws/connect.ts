import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

const connectionsTable = process.env.WS_CONNECTIONS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const connectionId = event.requestContext.connectionId
  const timestamp = new Date().toISOString()

  const item = {
    id: connectionId,
    timestamp
  }

  console.log('Storing a new ws connection: ', item)
  console.log('Connection DB name ', connectionsTable)

  await docClient.put({
    TableName: connectionsTable,
    Item: item
  }).promise()
  console.log('Stored success: ', item)

  return {
    statusCode: 200,
    body: ''
  }
}
