import * as commentsDao from "../dao/comments-dao.js";
import * as moviesDao from "../dao/movies-dao.js";
import * as usersDao from "../dao/users-dao.js";

const CommentController = (app) => {
    app.post('/api/titles/:titleId/comments', createComment);
    app.get('/api/titles/:titleId/comments', findAllCommentsByMovie);
    app.put('/api/comments/:cid', updateComment);
    app.delete('/api/comments/:cid', deleteComment);
    app.get('/api/comments', findAllComments);
    app.get('/api/users/:uid/comments', findAllCommentsByUser);
}

/**
 * Create a new comment (For critic)
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createComment = async (req, res) => {
    const profile = req.session['profile']

    // Unauthenticated
    if (!profile) res.sendStatus(401);
    else {
        // Unauthorized if not critic
        if (!profile.isCritic) res.sendStatus(403);
        // Proceed if the user is a critic
        else {
            try {
                const userID = await usersDao.findUserByUsername(profile.username);
                const movieId = await moviesDao.findMovieByImdbId(req.params.titleId);
                const insertedComment = await commentsDao.createComment(userID, movieId, req.body.comment);
                res.json({
                    _id: insertedComment._id,
                    timestamp: insertedComment.postedOn,
                });
            } catch (error) {
                // Throw internal server error for any error.
                res.sendStatus(500);
            }
        }
    }
}

const findAllComments = async (req, res) => {
    const comments = await commentsDao.findAllComments()
    res.json(comments);
}

/**
 * Finds all comments for a movie
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const findAllCommentsByMovie = async (req, res) => {
    const profile = req.session['profile'];

    res.set('Cache-Control', 'no-store');

    // Unauthenticated
    if (!profile) res.sendStatus(401);

    // For authenticated user
    else {
        try {
            const movieId = await moviesDao.getMovieIdByImdbId(req.params.titleId);
            const comments = await commentsDao.findAllCommentsByMovie(movieId).populate(['movie', 'postedBy']);
            const parsedComments = comments.map(comment => ({
                _id: comment._id,
                timestamp: comment.postedOn,
                username: comment.postedBy.username,
                comment: comment.comment,
                avatar: comment.postedBy.avatarImage,
                userId: comment.postedBy._id
            }))
            res.json({
                count: parsedComments.length,
                comments: parsedComments
            });
        } catch (error) {
            // Throw internal error
            res.sendStatus(500);
        }
    }
}
/**
 * Retrieves all movie comments made by a user from the database
 * @param {Request} req The request from the client, 
 * including the path parameter uid representing the user who has commented on a movie
 * @param {Response} res The response to the client, 
 * including the body as a JSON array containing the relevant comment objects
 */
const findAllCommentsByUser = async (req, res) => {
    const userId = req.params.uid;
    return await commentsDao.findAllCommentsByUser(userId)
        .then(comments => res.json(comments));
}

/**
 * Update a comment (Must be the comment's owner and a critic)
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateComment = async (req, res) => {
    const profile = req.session['profile'];
    const cid = req.params.cid;

    // Unauthenticated
    if (!profile) res.sendStatus(401);

    else {
        try {
            const comment = await commentsDao.findCommentById(cid).populate('postedBy');

            if (!comment) res.sendStatus(404);
            else {
                // Return 403 if not comment owner and critic
                if (!(profile.isCritic && profile.username === comment.postedBy.username)) res.sendStatus(403);

                // Proceed otherwise
                else {
                    await commentsDao.updateComment(cid, req.body.comment);
                    res.sendStatus(204);
                }
            }
        } catch (error) {
            // Throw internal error
            res.sendStatus(500);
        }
    }
}

/**
 * Delete a comment (Must be the comment's owner and a critic or an admin)
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteComment = async (req, res) => {
    const profile = req.session['profile'];
    const cid = req.params.cid;

    // Unauthenticated
    if (!profile) res.sendStatus(401);

    else {
        try {
            const comment = await commentsDao.findCommentById(cid).populate('postedBy');

            if (!comment) res.sendStatus(404);
            else {
                // Return 403 if not comment owner and critic
                if (!((profile.isCritic && profile.username === comment.postedBy.username) || profile.isAdmin)) res.sendStatus(403);

                // Proceed otherwise
                else {
                    await commentsDao.deleteComment(cid);
                    res.sendStatus(204);
                }
            }
        } catch (error) {
            // Throw internal error
            res.sendStatus(500);
        }
    }
}

export default CommentController;
