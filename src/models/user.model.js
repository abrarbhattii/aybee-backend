import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
        },
        coverImage: {
            type: String, //cloudinary url
        },
        password: {
            type: String, // encrypt challenge
            required: [true, 'password is required']
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

// arrow function/callback doesnt have this context ref
// so use function instead here also async 
userSchema.pre("save", async function (next) {
    
    if(!this.isModified("password")) return next();
    // rounds = 10
    this.password = bcrypt.hash(this.password, 10);
    next();
});

// method to check password if entered correct or not
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    // It returns a JWT string
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    // It returns a JWT string
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = model("User", userSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
// testing code
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { _id: 'abc123' },
  'mySuperSecretKey',
  { expiresIn: '7d' }
);

console.log(token);  // Prints a long string like eyJhbGciOi...

try {
    const decoded = jwt.verify(token, 'mySuperSecretKey');
    console.log(decoded);  // { _id: 'abc123', iat: ..., exp: ... }
} catch (error) {
    console.error(error.message);
}

*/