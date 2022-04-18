import mongoose, {Schema} from "mongoose";

const likesSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "userModel"},
    movie: {type: Schema.Types.ObjectId, ref: "movieModel"}
}, {collection: "likes"});

export default likesSchema;