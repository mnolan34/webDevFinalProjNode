import * as usersDao from "../dao/users-dao.js";

/**/

const userController = (app) => {
    app.get('/api/users', findAllUsers);
    //app.get('/api/users/:typeOfUser', findUserByType);
    app.get('/api/users/:uid', findUserById);
    app.get('/api/users/types/admin/:uid', findIfUserAdmin);
    app.get('/api/users/types/critic/:uid', findIfUserCritic);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const findAllUsers = async (req, res) => {
    return await usersDao.findAllUsers().then(user => res.json(user));
}

/*
const findUsersByType = async (req, res) => {
    const userType = req.params.typeOfUser;
    return await usersDao.findUsersByType(userType).then(user => res.json(user));
}
 */

const findUserById = async (req, res) => {
    const userId = req.params["id"];
    const user = usersDao.findUserById(userId);
    if(user){
        res.json(user);
    }else{
        res.sendStatus(404);
    }
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
    const userId = req.params['id'];
    const updatedUser = req.body;
    const status = await usersDao.updateUser(userId, updatedUser);
    res.json(status);
}

/**
const findUserByUsername = async (req, res) => {
    const userName = req.params.username;
    const returnedUser = usersDao.findUserByUsername(userName);
    res.send(returnedUser);
}
*/

export default userController;