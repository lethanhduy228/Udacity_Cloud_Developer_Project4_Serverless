import { TodosAccess } from '../dataLayer/todosAcess'
import { TodoItem } from '../../models/TodoItem'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
// import * as uuid from 'uuid'
// import * as createError from 'http-errors'
import { TodoUpdate } from '../../models/TodoUpdate'

// TODO: Implement businessLogic
const todosAccess = new TodosAccess()
const logger = createLogger('TodosAccess')

export async function createTodo(
  todoId: String,
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  logger.info('Received a create todo request')
  // const name = createTodoRequest.name
  // if (name.length < 1) {return "invalid name"}
  const todo = todosAccess.createTodo({
    todoId: todoId,
    userId: userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
    createdAt: new Date().toISOString(),
    attachmentUrl: undefined
  } as TodoItem)

  return todo
}

export async function getTodosByUser(userId: string): Promise<TodoItem[]> {
  logger.info('Received a get all todos request')
  return todosAccess.getTodosByUser(userId)
}

export async function updateTodo(
  todoId: String,
  updatedTodo: UpdateTodoRequest,
  userId: String
): Promise<TodoUpdate> {
  logger.info('Received a update todo request')
  const updatedTodoRs = await todosAccess.updateTodo(
    todoId,
    updatedTodo,
    userId
  )
  return updatedTodoRs
}

export async function deleteTodo(
  todoId: String,
  userId: String
): Promise<void> {
  logger.info('Received a delete todo request')
  todosAccess.deleteTodo(todoId, userId)
}

export async function createAttachmentPresignedUrl(
  todoId: String,
  imageId: String,
  userId: String
): Promise<string> {
  logger.info('Received an create presignedUrl request')
  return todosAccess.createAttachmentPresignedUrl(todoId, imageId, userId)
}
