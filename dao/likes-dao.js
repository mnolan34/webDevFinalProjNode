import likesModel from "../mongoose/Likes/likes-model.js";

export const findAllLikes = () => likesModel.find();
export const findAllLikesByMovie = (mid) => likesModel.find(mid);
export const createLike = (uid, mid) => likesModel.create(uid, mid);
export const deleteLike = (likeId) => likesModel.deleteOne({_id: likeId});

module.exports(findAllLikes, findAllLikesByMovie, createLike, deleteLike);
