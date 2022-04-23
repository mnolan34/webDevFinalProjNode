
import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
    comment: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    postedOn: {type: Date, default: Date.now()},
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "movieModel"},
}, {collection: 'comments'});

export default commentsSchema;