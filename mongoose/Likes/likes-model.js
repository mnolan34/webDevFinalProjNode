import mongoose from 'mongoose';
import likesSchema from "./likes-schema.js";

const likesModel = mongoose.model('LikeModel', likeSchema);
export default likesModel;