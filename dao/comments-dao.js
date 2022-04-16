import commentsModel from "../mongoose/Comments/comments-model.js";
import tuitsModel from "../mongoose/tuits-model.js";

export const findAllComments = () => commentsModel.find();
export const createComment = (uid, mid, body) => commentsModel.create(uid, mid, body);
export const deleteComment = (cid) => commentsModel.deleteOne({_id: cid});
export const updateComment = (cid, comment) => tuitsModel.updateOne({_id: cid}, {$set: comment});