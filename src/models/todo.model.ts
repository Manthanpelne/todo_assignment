import mongoose from "../db";


const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    done:{
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const Todo = mongoose.model("todos", TodoSchema)

export default Todo