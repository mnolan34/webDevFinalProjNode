import tuitsModel from "../mongoose/tuits-model.js";

    export const findAllTuitsDAO = () => tuitsModel.find();
    export const createTuitDAO = (tuit) => tuitsModel.create(tuit);
    export const deleteTuitDAO = (tid) => tuitsModel.deleteOne({_id: tid});
    export const updateTuitDAO = (tid, tuit) => tuitsModel.updateOne({_id: tid}, {$set: tuit});
