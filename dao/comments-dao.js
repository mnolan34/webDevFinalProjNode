import commentsModel from "../mongoose/Comments/comments-model.js";

export const findAllComments = () => commentsModel.find();
export const createComment = (uid, mid, body) => commentsModel.create(uid, mid, body);
export const deleteComment = (cid) => commentsModel.deleteOne({_id: cid});
export const updateComment = (cid, comment) => commentsModel.updateOne({_id: cid}, {$set: comment});
export const findAllCommentsByMovie = (mid) => commentsModel.find(mid);

//Added functions
export const findAllCommentsByUser = (uid) => commentsModel.find(uid);

export default { findAllComments,
                createComment,
                deleteComment,
                updateComment,
                findAllCommentsByMovie,
                findAllCommentsByUser

                }