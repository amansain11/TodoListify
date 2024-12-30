import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import {User} from "../models/users.model.js";

const registerUser = asyncHandler(async (req, res)=>{
    const {email, username, password} = req.body;

    if(
        [email, username, password].some((field) => field?.trim() === "")
    ){
        throw new apiError(400, "email, username or password must not be empty")
    }

    const existedUser = await User.findOne(
        {
            $or: [{username}, {email}]
        }
    )

    if(existedUser){
        throw new apiError(400, "User with email or username already exists")
    }

    const user = await User.create(
        {
            email,
            password,
            username: username.toLowerCase(),
        }
    )

    if(!user){
        throw new apiError(500, "Error while registering user")
    }

    return res
    .status(201)
    .json(
        new apiResponse(200, user, "User registered successfully")
    )
})

export {
    registerUser
}