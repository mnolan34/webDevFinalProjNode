import {createTuitDAO, deleteTuitDAO, updateTuitDAO, findAllTuitsDAO} from "../dao/tuits-dao.js";

const createTuit = async (req,res) => {
    const newTuit = req.body;
    const insertedTuit = await createTuitDAO(newTuit);
    res.json(insertedTuit);
}

const findAllTuits = async (req,res) => {
    const tuits = await findAllTuitsDAO()
    res.json(tuits);
}

const updateTuit = async (req,res) => {
    const tuitIdToUpdate = req.params.tid;
    const updatedTuit = req.body;
    const status = await updateTuitDAO(tuitIdToUpdate, updatedTuit);
    res.send(status);
}

const deleteTuit = async (req,res) => {
    const tuitIdToDelete = req.params.tid;
    const status = await deleteTuitDAO(tuitIdToDelete);
    res.send(status);
}

export default(app) =>{
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findAllTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
