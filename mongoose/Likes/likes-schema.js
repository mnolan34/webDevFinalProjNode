import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: "movieModel"}
}, {collection: "likes"});

export default likesSchema;