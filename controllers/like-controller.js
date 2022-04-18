import * as likesDao from "../dao/likes-dao.js";

const createLike = async (req,res) => {
    const User = req.params.uid;
    const Movie = req.params.mid;
    const insertedLike = await likesDao.createLike(User, Movie);
    res.json(insertedLike);
}

const findAllLikes = async (req,res) => {
    const likes = await likesDao.findAllLikes();
    res.json(likes);
}

const findAllLikesByMovie = async (req, res) => {
    const movieId = req.params.mid;
    const likes = await likesDao.findAllLikesByMovie(movieId);
    res.json(likes);
}


const deleteLike = async (req,res) => {
    const likeToDelete = req.params.lid;
    const status = await likesDao.deleteLike(likeToDelete);
    res.send(status);
}

export default(app) =>{
    app.post('/api/likes', createLike);
    app.get('/api/likes', findAllLikes);
    app.get('/api/likes/:mid', findAllLikesByMovie);
    app.delete('/api/likes/:cid', deleteLike);
}