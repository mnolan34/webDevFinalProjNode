import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    body: String,
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: Date,
    movie: {type: Schema.Types.ObjectId, ref: "MovieModel"}
}, {collection: 'comments'});

export default commentsSchema;