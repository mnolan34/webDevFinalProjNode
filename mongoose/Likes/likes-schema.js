import mongoose from "mongoose";
import userSchema from "../Users/user-schema";
import movieSchema from "../Movies/movie-schema";

const likesSchema = new mongoose.Schema({
    user: {type: userSchema},
    movie: {type: movieSchema}
}, {collection: "likes"});

export default likesSchema;