/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from 'mongoose';
import likesSchema from "./likes-schema.js";

const likesModel = mongoose.model('LikeModel', likesSchema);
export default likesModel;