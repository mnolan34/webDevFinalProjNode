import mongoose, {Schema} from "mongoose";

const commentsSchema = new mongoose.Schema({
    body: String,
    postedBy: { type: Schema.Types.ObjectId, ref: "userModel"},
    postedOn: Date,
    movie: { type: Schema.Types.ObjectId, ref: "movieModel"},
}, {collection: 'comments'});

export default commentsSchema;