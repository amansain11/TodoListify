import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import {SubTodo} from "../models/subtodos.model.js";
import {Todo} from "../models/todos.model.js";
import mongoose from "mongoose";

const addSubTodo = asyncHandler(async (req, res)=>{
    const {todoId} = req.params

    if(!todoId){
        throw new apiError(400, "Todo ID is required")
    }

    if(!mongoose.Types.ObjectId.isValid(todoId)){
        throw new apiError(400, "Invalid Todo ID format")
    }

    const {content} = req.body

    if(!content || content.trim() === ""){
        throw new apiError(400, "Content is required")
    }

    if(await SubTodo.findOne({content})){
        throw new apiError(404, "subTodo with same name already exists")
    }

    const parentTodo = await Todo.findById(todoId)

    if(!parentTodo){
        throw new apiError(404, "Parent Todo Not Found")
    }

    const subTodo = await SubTodo.create(
        {
            content: content,
            parentTodo: todoId
        }
    )

    if(!subTodo){
        throw new apiError(500, "Error while creating SubTodo")
    }

    parentTodo.subTodos.push(subTodo._id)
    parentTodo.complete = false
    await parentTodo.save()

    if(!(parentTodo.subTodos || parentTodo.subTodos.length)){
        throw new apiError(500, "Error while inserting subTodo into it's parent Todo")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, subTodo, "SubTodo added successfully")
    )
})

export {
    addSubTodo,
}