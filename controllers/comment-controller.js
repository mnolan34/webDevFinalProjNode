import * as commentsDao from "../dao/comments-dao.js";

const createComment = async (req,res) => {
    const newComment = req.body;
    const movieId = req.params.mid;
    const insertedComment = await commentsDao.createComment(movieId, newComment);
    res.json(insertedComment);
}

const findAllComments = async (req,res) => {
    const comments = await commentsDao.findAllComments()
    res.json(comments);
}

const findAllCommentsByMovie = async (req, res) => {
    const movieId = req.params.mid;
    const comments = await commentsDao.findAllCommentsByMovie(movieId);
    res.json(comments);
}

const findAllCommentsByUser = async (req, res) => {
    const userId = req.params.uid;
    const comments = await commentsDao.findAllCommentsByUser(userId);
    //res.json(comments);
    comments.then(comment => res.json(comment));
}

const updateComment = async (req,res) => {
    const CommentToUpdate = req.params.cid;
    const updatedComment = req.body;
    const status = await commentsDao.updateComment(CommentToUpdate, updatedComment);
    res.send(status);
}

const deleteComment = async (req,res) => {
    const CommentToDelete = req.params.cid;
    const status = await commentsDao.deleteComment(CommentToDelete);
    res.send(status);
}

export default(app) =>{
    app.post('/api/title/:titleId/comments', createComment);
    app.get('/api/comments', findAllComments);
    app.get('/api/comments/:mid', findAllCommentsByMovie);
    //TODO: Make sure this is correct URL, not same as Movie
    app.get('/api/comments/:uid', findAllCommentsByUser);
    app.put('/api/comments/:cid', updateComment);
    app.delete('/api/comments/:cid', deleteComment);
}