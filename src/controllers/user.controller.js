import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import {User} from "../models/users.model.js";

const generateAccessAndRefreshToken = async (userId) =>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
    
        user.refreshToken = refreshToken;
        user.save({validateBeforeSave: false});
    
        return { accessToken, refreshToken };       
    } catch (error) {
        throw new apiError(500, "Error while generating refresh and access token", error)
    }
}

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

const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    
    if(!(email || password) || (email.trim() || password.trim()) === ""){
        throw new apiError(400, "email or password is required")
    }

    const user = await User.findOne({email})
    
    if(!user){
        throw new apiError(404, "User does not exists")
    }

    // console.log(password)
    // console.log(user.password)

    const isPasswordValid = await user.isPasswordCorrect(password)
    // console.log(isPasswordValid)

    if(!isPasswordValid){
        throw new apiError(404, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new apiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken,
            },
            "User logged in Successfully"
        )
    )

})

export {
    registerUser,
    loginUser
}