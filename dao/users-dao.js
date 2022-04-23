import userModel from "../mongoose/Users/user-model.js";

export const findAllUsers = () => userModel.find();
export const findUserById = (uid) => userModel.findOne({ _id: uid });
export const createUser = (user) => userModel.create(user);
export const deleteUser = (uid) => userModel.deleteOne({ _id: uid });
export const updateUser = (uid, user) => userModel.updateOne(
    { _id: uid },
    { $set: user }
);

//auth functions
export const findUserByLogin = (userName, password) => userModel.findOne({ userName, password });
export const findUserByUsername = (userName) => userModel.findOne(userName);

export const findUsersByType = (type) => {
    if (type === "isCritic") {
        return userModel.find({ isCritic: { $eq: true } });
    }
    else {
        return userModel.find({ isAdmin: { $eq: true } })
    };
};

export default {
    findAllUsers, findUserById, createUser, deleteUser, updateUser,
    findUserByLogin, findUserByUsername, findUsersByType
};