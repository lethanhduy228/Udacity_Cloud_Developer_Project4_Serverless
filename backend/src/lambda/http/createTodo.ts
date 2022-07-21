import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import * as uuid from 'uuid'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'
import { createTodo } from '../../helpers/businessLogic/todos'
import { sendMessageToAllActiveConnections } from '../../utils/websocket'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const createTodoRequest: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    const userId = getUserId(event)
    const todoId = uuid.v4()

    const name  = createTodoRequest.name
    if (name.length === 0 ) {
      return {
        statusCode: 401,
        body: null
      }
    }

    const newTodo = await createTodo(todoId, createTodoRequest, userId)
    sendMessageToAllActiveConnections(`User with id ${userId} has just created a new todo`)
    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newTodo
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
