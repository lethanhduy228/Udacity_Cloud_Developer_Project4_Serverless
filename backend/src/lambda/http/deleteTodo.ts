import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../helpers/businessLogic/todos'
import { getUserId } from '../utils'
import { sendMessageToAllActiveConnections } from '../../utils/websocket'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    const userId = getUserId(event)
    await deleteTodo(todoId, userId)
    sendMessageToAllActiveConnections(`User with id ${userId} has just deleted one of his todo`)
    return {
      statusCode: 200,
      body: null
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
