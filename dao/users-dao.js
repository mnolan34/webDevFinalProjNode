import userModel from "../mongoose/Users/user-model.js";

export const findAllUsers = () => userModel.find();
export const createUser = (user) => userModel.create(user);
export const deleteUser = (uid) => userModel.deleteOne({_id: uid});