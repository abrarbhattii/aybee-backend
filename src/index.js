// 1st approach
/*
import mongoose from "mongoose";
import {DB_NAME} from "./constants";

import express from "express";
const app = express()

// iife 
;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.error("ERROR", error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR", error);
        throw err;
    }
})()
*/

// 2nd approach
// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`SERVER RUNNING AT ${process.env.PORT}`);
    })
    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error;
    })
})
.catch((err) => {
    console.log("mongoDB connection Failed", err);
})