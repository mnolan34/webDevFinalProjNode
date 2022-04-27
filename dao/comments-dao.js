import commentsModel from "../mongoose/Comments/comments-model.js";

/**
 */
export const findAllComments = () =>
  commentsModel.find();

/**
 * Create a new comment on DB
 *
 * @param userID
 * @param mid
 * @param commentBody
 * @returns {Promise<HydratedDocument<unknown, {}, {}>>}
 */
export const createComment = (userID, mid, commentBody) =>
  commentsModel.create(
    {
      postedBy: userID,
      movie: mid,
      comment: commentBody
    }
  );

/**
 * Find a comment based on comment _id.
 *
 * @param _id
 * @returns {QueryWithHelpers<HydratedDocument<unknown, {}, {}> | null, HydratedDocument<unknown, {}, {}>, {}, unknown>}
 */
export const findCommentById = (_id) =>
  commentsModel.findById(_id);

/**
 * Count the number of comments based on imdbID
 *
 * @param imdbID
 * @returns {QueryWithHelpers<number, HydratedDocument<unknown, {}, {}>, {}, unknown>}
 */
export const countCommentsByMovieID = async (mid) => {
  return commentsModel.count({ movie: mid });
};

/**
 * @param  {} cid
 */
export const deleteComment = (cid) => commentsModel.deleteOne({ _id: cid });

/**
 * @param  {} cid
 * @param  {} comment
 */
export const updateComment = (cid, comment) =>
  commentsModel.updateOne({ _id: cid }, { $set: { comment: comment } });

/**
 * @param  {} _id
 */
export const findAllCommentsByMovie = (_id) =>
  commentsModel.find({ movie: _id }).sort({ postedOn: -1 });

/**
 * @param  {} uid
 */
export const findAllCommentsByUser = (uid) =>
  commentsModel.find({ postedBy: uid }).populate("comment").exec();