import mongoose from "mongoose";
import userSchema from "../Users/user-schema.js";
import movieSchema from "../Movies/movie-schema.js";

const commentsSchema = new mongoose.Schema({
    body: String,
    postedBy: {type: userSchema},
    postedOn: Date,
    movie: {type: movieSchema},
}, {collection: 'comments'});

export default commentsSchema;