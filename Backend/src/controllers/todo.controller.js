import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import {Todo} from "../models/todos.model.js";
import mongoose from "mongoose";

const addTodo = asyncHandler(async (req, res)=>{
    const title = req.body.title

    if(!title || title.trim() === ""){
        throw new apiError(400, "title cannot be empty")
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

const updateTodo = asyncHandler(async (req, res)=>{
    const todoId = req.params.todoId

    if(!todoId){
        throw new apiError(400, "Todo ID is required")
    }

    if(!mongoose.Types.ObjectId.isValid(todoId)){
        throw new apiError(400, "Invalid Todo ID format")
    }

    const title = req.body.title

    if(!title || title.trim() === ""){
        throw new apiError(400, "title cannot be empty")
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        {
            $set: {
                title: title
            }
        },
        { new: true }
    )

    if(!updatedTodo){
        throw new apiError(404, "Todo not found")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, updatedTodo, "Todo updated successfully")
    )
})

const deleteTodo = asyncHandler(async (req, res)=>{
    const todoId = req.params.todoId

    if(!todoId){
        throw new apiError(400, "Todo ID is required")
    }

    if(!mongoose.Types.ObjectId.isValid(todoId)){
        throw new apiError(400, "Invalid Todo ID format")
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId)

    if(!deletedTodo){
        throw new apiError(404, "Todo not found")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, deletedTodo, "Todo has been deleted successfully")
    )
})

const toggleCompletion = asyncHandler(async (req, res)=>{
    const todoId = req.params.todoId

    if(!todoId){
        throw new apiError(400, "Todo ID is required")
    }

    if(!mongoose.Types.ObjectId.isValid(todoId)){
        throw new apiError(400, "Invalid Todo ID format")
    }

    const todo = await Todo.findById(todoId)

    if(!todo){
        throw new apiError(404, "Todo not found")
    }

    if(!todo.complete){
        todo.complete = true

        await todo.save()

        return res
        .status(200)
        .json(
            new apiResponse(200, todo, "Todo marked to complete")
        )
    }
    else{
        todo.complete = false

        await todo.save()

        return res
        .status(200)
        .json(
            new apiResponse(200, todo, "Todo marked to incomplete")
        )
    }
})

const getAllTodos = asyncHandler(async (req, res)=>{
    const {page = 1, limit = 10} = req.query

    if(page <= 0 || limit <= 0){
        throw new apiError(400, "Page and limit must be positive numbers")
    }

    const result = await Todo.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(`${req.user._id}`)
            }
        },
        {
            $facet: {
                todos: [
                    { $skip: (page - 1) * limit },
                    { $limit: parseInt(limit) }
                ],
                totalCount: [
                    { $count: "total" }
                ]
            }
        },
        {
            $addFields: {
                totalCount: {
                    $ifNull: [{$first: "$totalCount.total"}, 0]
                }
            }
        }
    ])

    if(!result || !result.length){
        throw new apiError(404, "Todos not found")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, result[0], "Todos fetched successfully")
    )
}) 

const getPendingTodos = asyncHandler(async (req, res)=>{
    const {page = 1, limit = 10} = req.query

    if(page <= 0 || limit <= 0){
        throw new apiError(400, "Page and limit must be positive numbers")
    }

    const result = await Todo.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(`${req.user._id}`),
                complete: false
            }
        },
        {
            $facet: {
                todos: [
                    { $skip: (page - 1) * limit },
                    { $limit: parseInt(limit) }
                ],
                totalCount: [
                    { $count: "total" }
                ]
            }
        },
        {
            $addFields: {
                totalCount: {
                    $ifNull: [{$first: "$totalCount.total"}, 0]
                }
            }
        }
    ])

    if(!result || !result.length){
        throw new apiError(404, "Todos not found")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, result[0], "Pending Todos fetched successfully")
    )
})

const getCompletedTodos = asyncHandler(async (req, res)=>{
    const {page = 1, limit = 10} = req.query

    if(page <= 0 || limit <= 0){
        throw new apiError(400, "Page and limit must be positive numbers")
    }

    const result = await Todo.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(`${req.user._id}`),
                complete: true
            }
        },
        {
            $facet: {
                todos: [
                    { $skip: (page - 1) * limit },
                    { $limit: parseInt(limit) }
                ],
                totalCount: [
                    { $count: "total" }
                ]
            }
        },
        {
            $addFields: {
                totalCount: {
                    $ifNull: [{$first: "$totalCount.total"}, 0]
                }
            }
        }
    ])

    if(!result || !result.length){
        throw new apiError(404, "Todos not found")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, result[0], "Completed Todos fetched successfully")
    )
})

export {
    addTodo,
    updateTodo,
    deleteTodo,
    toggleCompletion,
    getAllTodos,
    getPendingTodos,
    getCompletedTodos,
}