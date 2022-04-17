import userModel from "../mongoose/Users/user-model.js";

export const findAllUsers = () => userModel.find();
export const findUserById = (uid) => userModel.findOne(uid);
export const createUser = (user) => userModel.create(user);
export const deleteUser = (uid) => userModel.deleteOne({ _id: uid });
export const updateUser = (uid, user) => userModel.updateOne({ _id: uid }, { $set: user });