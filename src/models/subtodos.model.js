import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false
        },
        parentTodo: {
            type: mongoose.Types.ObjectId,
            ref: "Todo"
        }
    },{timestamps: true}
)

export const SubTodo = mongoose.model("SubTodo", subTodoSchema)