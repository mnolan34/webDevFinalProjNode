const users = [];
import userDao from "../dao/users-dao.js";

const register = async (req, res) => {
    const credentials = req.body;
    //implement findUserByUsername
    const existingUser = await userDao.findUserByUsername;

    if(existingUser){
        return res.sendStatus(403);
    }else{
        const newUser = await userDao.createUser(credentials)
        req.session['profile'] = newUser
        res.json(newUser)
    }
}

const login = async (req, res) => {
    const credentials = req.body;
    const loginProfile = await userDao.findUserByLogin(credentials.username, credentials.password);
    if (loginProfile) {
        req.session['profile'] = profile;
        res.json(profile);
        return;
    }
    res.sendStatus(403);
}

const profile = async (req, res) => {
    const profile = req.session['profile']
    if(profile) {
        res.json(profile)
    } else {
        res.sendStatus(503)
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

const findUsers = (req, res) => {
    res.json(users);
}

module.exports = (app) => {
    app.post('/api/register', register);
    app.post('/api/profile', profile);
    app.post('/api/signin', login);
    app.post('/api/logout', logout);
    app.get('/api/users', findUsers);
}