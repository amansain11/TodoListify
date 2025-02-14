import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        complete: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    },{timestamps: true}
)

export const Todo = mongoose.model('Todo', todoSchema)