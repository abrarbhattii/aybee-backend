import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import connectionInstance from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n mongoDB connected !! Db HOST: ${connectionInstance.connection.host}`);
        console.log(connectionInstance);
    } catch (error) {
        console.log("mongoDB connection error", error);
        process.exit(1)
    }
}

export default connectDB;