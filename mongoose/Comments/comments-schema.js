import mongoose from "mongoose";
import userSchema from "../Users/user-schema.js";
import movieSchema from "../Movies/movie-schema.js";

const commentsSchema = new mongoose.Schema({
    body: String,
    postedBy: {type: Schema.Types.ObjectId, ref: "user"},
    postedOn: Date,
    movie: {type: Schema.Types.ObjectId, ref: "movie"},
}, {collection: 'comments'});

export default commentsSchema;