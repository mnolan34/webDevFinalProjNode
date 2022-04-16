import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    movie: {type: Schema.Types.ObjectId, ref: "MovieModel"}
}, {collection: "likes"});

export default likesSchema;