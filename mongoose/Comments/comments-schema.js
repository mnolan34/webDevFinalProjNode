import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
    body: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    postedOn: Date,
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "movieModel"},
}, {collection: 'comments'});

export default commentsSchema;