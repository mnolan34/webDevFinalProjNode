import mongoose from "mongoose";
import userSchema from "../Users/user-schema";
import movieSchema from "../Movies/movie-schema";

const likesSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "user"},
    movie: {type: Schema.Types.ObjectId, ref: "movie"}
}, {collection: "likes"});

export default likesSchema;