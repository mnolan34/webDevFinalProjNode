import * as usersDao from "../dao/users-dao.js";
import user from "../mongoose/Users/user-schema";
import {findUserByType} from "../dao/users-dao.js";

const userController = (app) => {
    app.get('/api/users', findAllUsers);
    //app.get('/api/users/:typeOfUser', findUserByType);
    app.get('/api/users/:uid', findUserById);
    app.get('/api/users/:uid', findIfUserAdmin);
    app.get('/api/users/:uid', findIfUserCritic);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const findAllUsers = async (req, res) => {
    return await usersDao.findAllUsers().then(user => res.json(user));
}

/*
const findUsersByType = async (req, res) => {
    const userType = req.params.userType;
    return await usersDao.findUserByType(userType).then(user => res.json(user));
}
 */

const findUserById = async (req, res) => {
    const userId = req.params.uid;
    return await usersDao.findUserById(userId).then(user => res.json(user));
}

const findIfUserCritic = async (req, res) => {
    const userId = req.params.uid;
    const pulledUser = usersDao.findUserById(userId).then(user=>user);
    return await res.json(pulledUser.isCritic());
}

const findIfUserAdmin = async(req, res) => {
    const userId = req.params.uid;
    const pulledUser = usersDao.findUserById(userId).then(user=>user);
    return await res.json(pulledUser.isAdmin());
}

const createUser = async (req, res) => {
    return await usersDao.createUser(req.body).then(user => res.json(user));
}

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    return await usersDao.deleteUser(userId).then(status => res.json(status));
}

const updateUser = async (req, res) => {
    const userId = req.params.uid;
    const updatedUser = req.body;
    return await usersDao.updateUser(userId, updatedUser).then(status => res.json(status));
}

/**
const findUserByUsername = async (req, res) => {
    const userName = req.params.username;
    const returnedUser = usersDao.findUserByUsername(userName);
    res.send(returnedUser);
}
*/

export default userController;