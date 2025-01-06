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

const updateSubTodo = asyncHandler(async (req, res)=>{
    const {subtodoId} = req.params

    if(!subtodoId){
        throw new apiError(400, "SubTodo ID is required")
    }

    if(!mongoose.Types.ObjectId.isValid(subtodoId)){
        throw new apiError(400, "Invalid SubTodo ID format")
    }

    const {content} = req.body

    if(!content || content.trim() === ""){
        throw new apiError(400, "Content is required")
    }

    const updatedSubTodo = await SubTodo.findByIdAndUpdate(
        subtodoId,
        {
            $set: {
                content: content
            }
        },
        {new: true}
    )

    if(!updatedSubTodo){
        throw new apiError(404, "SubTodo not found or Error while updating SubTodo")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, updatedSubTodo, "SubTodo updated successfully")
    )
})

const deleteSubTodo = asyncHandler(async (req, res)=>{
    const {subtodoId} = req.params

    if(!subtodoId){
        throw new apiError(400, "SubTodo ID is required")
    }

    if(!mongoose.Types.ObjectId.isValid(subtodoId)){
        throw new apiError(400, "Invalid SubTodo ID format")
    }

    const deletedSubTodo = await SubTodo.findByIdAndDelete(subtodoId)

    if(!deletedSubTodo){
        throw new apiError(404, "SubTodo not found to delete")
    }

    const parentTodo = await Todo.updateOne(
        { _id: deletedSubTodo.parentTodo },
        {
            $pull: {
                subTodos: new mongoose.Types.ObjectId(`${deletedSubTodo._id}`)
            }
        }
    )

    if(!parentTodo){
        throw new apiError(404, "Parent Todo not found")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, deletedSubTodo, "SubTodo deleted successfully")
    )
})

const toggleCompletion = asyncHandler(async (req, res)=>{
    const {subtodoId} = req.params

    if(!subtodoId){
        throw new apiError(400, "SubTodo ID is required")
    }

    if(!mongoose.Types.ObjectId.isValid(subtodoId)){
        throw new apiError(400, "Invalid SubTodo ID format")
    }

    const subTodo = await SubTodo.findById(subtodoId)

    if(!subTodo){
        throw new apiError(404, "SubTodo not found")
    }

    if(!subTodo.complete){
        subTodo.complete = true

        await subTodo.save()

        return res
        .status(200)
        .json(
            new apiResponse(200, subTodo, "SubTodo marked to complete")
        )
    }
    else{
        subTodo.complete = false

        await subTodo.save()

        return res
        .status(200)
        .json(
            new apiResponse(200, subTodo, "SubTodo marked to incomplete")
        )
    }
})

export {
    addSubTodo,
    updateSubTodo,
    deleteSubTodo,
    toggleCompletion
}