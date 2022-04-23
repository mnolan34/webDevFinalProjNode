/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import userModel from "../mongoose/Users/user-model.js";

/**
 * Uses UserModel to retrieve all user documents from users collection
 * @returns Promise To be notified when the users are retrieved from
 * database
 */
const findAllUsers = () => userModel.find();

/**
 * Uses UserModel to retrieve single user document from users collection
 * @param {string} uid User's primary key
 * @returns Promise To be notified when user is retrieved from the database
 */
const findUserById = (uid) =>
    userModel.findOne({_id : uid});

/**
 * Inserts user instance into the database
 * @param {User} user Instance to be inserted into the database
 * @returns Promise To be notified when user is inserted into the database
 */
const createUser = (user) =>
    userModel.create(user);

/**
 * Removes user from the database.
 * @param {string} uid Primary key of user to be removed
 * @returns Promise To be notified when user is removed from the database
 */
const deleteUser = (uid) =>
    userModel.deleteOne({ _id : uid });

/**
 * Updates user with new values in database
 * @param {string} uid Primary key of user to be modified
 * @param {User} user User object containing properties and their new values
 * @returns Promise To be notified when user is updated in the database
 */
const updateUser = (uid, user) =>
    userModel.updateOne(
    { _id: uid },
    { $set: user }
    );

const findUserByUsername = (userName) =>
    userModel.findOne(userName);

const findUserByType = (type) =>
    userModel.find(type);

export default {
    findAllUsers,
    findUserById,
    createUser,
    deleteUser,
    updateUser,
    findUserByUsername,
    findUserByType
};