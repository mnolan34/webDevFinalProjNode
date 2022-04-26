import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
    comment: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "MovieModel"},
}, {collection: 'comments'});

export default commentsSchema;