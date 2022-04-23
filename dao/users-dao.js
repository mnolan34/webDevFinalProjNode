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
export const findAllUsers = () => userModel.find();

/**
 * Uses UserModel to retrieve single user document from users collection
 * @param {string} uid User's primary key
 * @returns Promise To be notified when user is retrieved from the database
 */
export const findUserById = (uid) =>
    userModel.findOne({_id : uid});

/**
 * Inserts user instance into the database
 * @param {User} user Instance to be inserted into the database
 * @returns Promise To be notified when user is inserted into the database
 */
export const createUser = (user) =>
    userModel.create(user);

/**
 * Removes user from the database.
 * @param {string} uid Primary key of user to be removed
 * @returns Promise To be notified when user is removed from the database
 */
export const deleteUser = (uid) =>
    userModel.deleteOne({ _id : uid });

/**
 * Updates user with new values in database
 * @param {string} uid Primary key of user to be modified
 * @param {User} user User object containing properties and their new values
 * @returns Promise To be notified when user is updated in the database
 */
export const updateUser = (uid, user) =>
    userModel.updateOne(
    { _id: uid },
    { $set: user }
    );
/**
 * Finds user according to username
 * @param {string} userName Unique username of user to be pulled
 * @returns User Object
 */
export const findUserByUsername = (userName) =>
    userModel.findOne({username : userName});

/**
 * Finds array of users based on userType
 * @param type
 * @returns array of usersMatching Type
 */

//TODO Fix Below Function
export const findUserByType = (type) =>
    userModel.find(type);
