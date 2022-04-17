import {
        findAllUsers,
        findUserById,
        createUser,
        deleteUser,
        updateUser
        } from "../dao/users-dao.js";
import users from "../mongoose/Users/user-model.js";


const userController = (app) => {
    app.get('/api/users', findAllTheUsers);
    app.get('/api/users/:uid', findAUserById);
    app.post('/api/users', createNewUser);
    app.delete('/api/users/:uid', deleteAUser);
    app.put('/api/users/:uid', updateAUser);
}

//updateAUser implemented
const updateAUser = async (req, res) => {
    const userId = req.params['uid'];
    const updatedUser = req.body;
    const status = await updateUser(userId, updatedUser);
    res.send(status);
}

//deleteUser implemented
const deleteAUser = async (req, res) => {
    const userId = req.params['uid'];
    const status = await deleteUser(userId);
    res.send(status);
}

//Create New User Made
const createNewUser = async (req, res) => {
    const newUser = req.body;
    const insertedUser = await createUser(newUser)
    res.json(insertedUser);
}

//implemented userById
const findAUserById = async (req, res) => {
    const userId = req.params.uid;
    const user = await findUserById(userId);
    res.json(user);
}

//find all users implemented
const findAllTheUsers = (req, res) => {
    const users = findAllUsers();
    res.json(users);
}

export default userController;