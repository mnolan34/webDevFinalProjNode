import * as usersDao from "../dao/users-dao.js";



const userController = (app) => {
    app.get('/api/users', findAllTheUsers);
    app.get('/api/users/:uid', findAUserById);
    app.post('/api/users', createNewUser);
    app.delete('/api/users/:uid', deleteAUser);
    app.put('/api/users/:uid', updateAUser);
}

const findAllUsers = async (req, res) => {
    return await usersDao.findAllUsers().then(user => res.json(user));
}

const findUserById = async (req, res) => {
    const userId = req.params.uid;
    return await usersDao.findUserById(userId).then(user => res.json(user));
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



export default userController;