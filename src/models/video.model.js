import mongoose, { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: true
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number, // cloudinary url
            required: true
        },
        views: {
            type: Number, 
            default: 0
        },
        isPublished: {
            type: Boolean, 
            default: true
        },
    },
    {
        timestamps: true
    }
);

// in order to write aggregation queries 
// use plugin hook and inject mongooseAggregatePaginate
videoSchema.plugin(mongooseAggregatePaginate);

export const Videp = model("Video", videoSchema);