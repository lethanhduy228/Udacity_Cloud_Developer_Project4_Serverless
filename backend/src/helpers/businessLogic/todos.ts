import { TodosAccess } from '../dataLayer/todosAcess'
import { TodoItem } from '../../models/TodoItem'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
// import { createLogger } from '../../utils/logger'
// import * as uuid from 'uuid'
// import * as createError from 'http-errors'
import { TodoUpdate } from '../../models/TodoUpdate'

// TODO: Implement businessLogic
const todosAccess = new TodosAccess()

export async function createTodo(
  todoId: String,
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
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

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  return todosAccess.getTodosForUser(userId)
}

export async function updateTodo(
  todoId: String,
  updatedTodo: UpdateTodoRequest,
  userId: String
): Promise<TodoUpdate> {
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
  todosAccess.deleteTodo(todoId, userId)
}

export async function createAttachmentPresignedUrl(
  todoId: String,
  imageId: String,
  userId: String
): Promise<string> {
  return todosAccess.createAttachmentPresignedUrl(todoId, imageId, userId)
}
