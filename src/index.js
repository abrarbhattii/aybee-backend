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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        console.log(`SERVER RUNNING AT PORT ${process.env.PORT}`);
    })
    app.on("error", (error) => {
        console.log("app.on ERROR: ", error);
        throw error;
    })

    // testing for server
    /*
        // app in Express is basically an instance of an EventEmitter (inherited from Node.js).
        // app.on("error", ...) is registering a listener for the error event on your Express app.
        // If at any point Express (or something in your app) emits an "error" event, this function will run.

        // But Normally, you don’t put app.on("error", ...)
        // instead, you add error handling on the server object 
        // returned by app.listen(). For example below:

        // Because it’s the server instance (not the Express app object) 
        // that actually emits things like "error" when binding a port fails.

        // First server on port 3000
        const server1 = app.listen(3000, () => {
            console.log("Server 1 running on port 3000");
        });

        server1.on("error", (err) => {
            console.error("Server error:", err.message);
        });

        // Node immediately schedules the callback (console.log("Server 2 running…")) 
        // to run if the listen call succeeds.But the actual binding to the port happens asynchronously.

        // Try to start another server on the SAME port (3000)
        const server2 = app.listen(3000);
        
        server2.on("listening", () => {
            console.log("Server 2 is really running on port 3000");
        });

        server2.on("error", (err) => {
            console.error("Server 2 error:", err.message);
        });

        // framework (like Express’ app.listen wrapper) calls the callback 
        // too eagerly, before the port binding completes.

        // needs http import
        const server3 = http.createServer(app);
        server3.listen(3000, () => console.log("hello"));
        const server4 = http.createServer(app);
        server4.listen(3000, () => console.log("hello2"));
    */
})
.catch((err) => {
    console.log("mongoDB connection Failed", err);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// defualt mongoDb connection without mongoose
/*
import { MongoClient, ServerApiVersion } from 'mongodb';
import http from "http";
async function dbConRun() {
    const uri = "mongodb+srv://prof_aybee:aybee42@cluster0.doxessh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    let client;
    try {
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log("run:func::mgDB connection error", error);
        process.exit(1)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
    
dbConRun()
.then(() => {
        const server = http.createServer(app);
        server.listen(3000, () => {
            console.log(`SERVER RUNNING AT PORT ${process.env.PORT}`)
        });

        app.on("error", (error) => {
            console.log("app.on ERROR: ", error);
            throw error;
        });
})
.catch((err)=> {
    console.log("mongoDB connection Failed", err);
});
*/