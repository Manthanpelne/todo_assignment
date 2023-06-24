import { Router } from 'express'
import TodoController from '../controllers/todo.controller'
const todoRouter = Router()

const todoCtrl = new TodoController()

todoRouter.get("/", todoCtrl.get)
todoRouter.get("/:id", todoCtrl.getById)
todoRouter.post("/", todoCtrl.post)
todoRouter.delete("/delete/:id",todoCtrl.delete)
todoRouter.patch("/update/:id",todoCtrl.update)

export default todoRouter