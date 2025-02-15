import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
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

todoSchema.index( //compostie unique index, gruop of title and owner index should be unique
    {
        title: 1,  
        owner: 1
    },
    { unique: true }
)

export const Todo = mongoose.model('Todo', todoSchema)