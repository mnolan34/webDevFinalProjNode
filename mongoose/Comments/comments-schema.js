import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    body: String,
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    movie: {type: Schema.Types.ObjectId, ref: "MovieModel"}
}, {collections: "comments"});

export default commentsSchema;