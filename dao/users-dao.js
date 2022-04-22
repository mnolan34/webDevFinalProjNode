import userModel from "../mongoose/Users/user-model.js";

export const findAllUsers = () => userModel.find();
export const findUserById = (uid) => userModel.findOne({_id:uid});
export const createUser = (user) => userModel.create(user);
export const deleteUser = (uid) => userModel.deleteOne({ _id: uid });
export const updateUser = (uid, user) => userModel.updateOne(
    { _id: uid },
    { $set: user }
);

//auth functions
export const findUserByLogin = (userName, password) => userModel.findOne({userName, password});
export const findUserByUsername = (userName) => userModel.findOne(userName);
export const findUserByType = (type) => userModel.find(type);
//export const findUserType = (uid) => userModel.findOne({_id:uid});

export default { findAllUsers, findUserById, createUser, deleteUser, updateUser, findUserByLogin, findUserByUsername,
                    findUserByType};