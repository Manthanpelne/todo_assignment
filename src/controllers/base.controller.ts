import { Request, Response } from 'express'
import mongoose from '../db'

export default class BaseController{

    model: mongoose.Model<any, any>
    modelName: string

    constructor(model: mongoose.Model<any, any>){
        this.model = model
        this.modelName = model.modelName
    }
    
    post = async (req: Request, res: Response) => {
        try {
            const data = req.body
            const dbData = await this.model.create(data)
            res.send(dbData)
        } catch (error) {
            res.status(400).send(`Error in POST ${this.modelName}`)
        }
    }

    get = async (req: Request, res: Response) => {
        try {
            const dbData = await this.model.find()
            res.send(dbData)
        } catch (error) {
            res.status(400).send(`Error in GET ${this.modelName}`)
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            
            const dbData = await this.model.find({_id: id})
            res.send(dbData)
        } catch (error) {
            res.status(400).send(`Error in GET ${this.modelName}`)
        }
    }

    delete =async (req:Request, res:Response) => {
        const id = req.params.id;

        try {
          const deleteTodo = await this.model.findByIdAndDelete({_id:id});
      
          if (deleteTodo) {
            res.json({ message: `todo with ID ${id} has been deleted.` });
          } else {
            res.status(404).json({ message: "Todo not found." });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error deleting Todo.', error: error.message });
        }
    }

    update =async (req:Request, res:Response) => {
        const Id = req.params.id;
        const Payload = req.body
        try {
          const updateTodo = await this.model.findByIdAndUpdate({_id:Id}, Payload);
      
          if (updateTodo) {
            res.json({ message: `todo with ID ${Id} has been updated.`,updateTodo });
          } else {
            res.status(404).json({ message: "Todo not found." });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error updating Todo.', error: error.message });
        }
    }
}