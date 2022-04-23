import * as commentsDao from "../dao/comments-dao.js";

const createComment = async (req,res) => {
    let userID = req.params.uid === "me" && req.session['profile'] ?
        req.session['profile']._id : req.params.uid;
    const movieId = req.params.mid;
    const newComment = req.body;
    const insertedComment = await commentsDao.createComment(userID, movieId, newComment);
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
    res.json(comments);
    //comments.then(comment => res.json(comment));
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
    app.get('/api/titles/:titleId/comments', findAllCommentsByMovie);
    app.get('/api/comments/:uid', findAllCommentsByUser);
    app.put('/api/comments/:cid', updateComment);
    app.delete('/api/comments/:cid', deleteComment);
}