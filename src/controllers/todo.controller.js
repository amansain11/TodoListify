import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import {Todo} from "../models/todos.model.js";

const addTodo = asyncHandler(async (req, res)=>{
    const title = req.body.title

    if(!title || title.trim() === ""){
        throw new apiError(400, "title cannot be empty")
    }

    const existedTodo = await Todo.findOne({title})

    if(existedTodo){
        throw new apiError(404, "Todo already exists")
    }

    const todo = await Todo.create(
        {
            title: title,
            owner: req.user._id
        }
    )

    if(!todo){
        throw new apiError(500, "Error while creating todo")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, todo, "Todo added successfully")
    )
})

export {
    addTodo,
}