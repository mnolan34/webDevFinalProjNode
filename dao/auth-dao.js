//auth functions
import userModel from "../mongoose/Users/user-model.js";

export const findUserByLogin = (userName, password) => userModel.findOne({userName, password});
export const findUserByUsername = (userName) => userModel.findOne(userName);
export const findUserByType = (type) => userModel.find(type);