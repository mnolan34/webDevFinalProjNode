import * as commentsDao from "../dao/comments-dao.js";

const createComment = async (req,res) => {
    const newComment = req.body;
    const insertedComment = await commentsDao.createComment(newComment);
    res.json(insertedComment);
}

const findAllComments = async (req,res) => {
    const comments = await commentsDao.findAllComments()
    res.json(comments);
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
    app.post('/api/comments', createComment);
    app.get('/api/comments', findAllComments);
    app.put('/api/comments/:cid', updateComment);
    app.delete('/api/comments/:cid', deleteComment);
}