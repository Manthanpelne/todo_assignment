import BaseController from './base.controller'
import Todo from '../models/todo.model'

export default class TodoController extends BaseController {
    
    constructor(){
        super(Todo)
    }
}