import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// async func returns promise
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // console.log(connectionInstance);
        console.log(`\n mongoDB connected !! Db HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongoDB connection error", error);
        process.exit(1)
    }
}

export default connectDB;