import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        passwordLength: {
            type: Number,
        },
        refreshToken: {
            type: String,
        }
    },{timestamps: true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(refershTokenOldExpiry){

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);  

    let expiry;
 
    if (refershTokenOldExpiry !== undefined && refershTokenOldExpiry > currentTimeInSeconds) {
        expiry = refershTokenOldExpiry - currentTimeInSeconds;
    } else {
        expiry = process.env.REFRESH_TOKEN_EXPIRY; 
    }

    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: expiry
        }
    )
}

export const User = mongoose.model("User", userSchema)