/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
import mongoose from 'mongoose';
import userSchema from "./user-schema.js";

const userModel = mongoose.model('UserModel', userSchema);
export default userModel;