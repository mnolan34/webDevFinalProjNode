/**
 * @file Implements DAO managing data storage of authorization functions.
 * Uses mongoose UserModel to integrate with MongoDB
 */
import userModel from "../mongoose/Users/user-model.js";

const findUserByLogin = (userName, password) =>
    userModel.findOne({userName, password});


const findUserByUsername = (userName) =>
    userModel.findOne(userName);

const findUserByType = (type) =>
    userModel.find(type);
/*
export default {
    findUserByLogin,
    findUserByUsername,
    findUserByType
}
 */