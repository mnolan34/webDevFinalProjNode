import commentsModel from "../mongoose/Comments/comments-model.js";

export const findAllComments = () =>
    commentsModel.find();

export const createComment = (userID, mid, commentBody) =>
    commentsModel.create(userID, mid, commentBody);

export const deleteComment = (cid) =>
    commentsModel.deleteOne({_id: cid});

export const updateComment = (cid, comment) =>
    commentsModel.updateOne({_id: cid}, {$set: comment});

export const findAllCommentsByMovie = (mid) =>
    commentsModel.find({movie : mid});

//Added functions
export const findAllCommentsByUser = (uid) =>
    commentsModel.find({postedBy : uid});