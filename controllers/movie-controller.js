const movieDao = require('../dao/movie-dao.js');

const likeMovie = async (req, res) => {
    const movie = req.body
    const actualMovie = await movieDao.likeMovie(movie)
    res.json(actualMovie)
}
const dislikeMovie = async () => {}
const findMovieByImdbID = async (req, res) => {
    const imdbID = req.params.imdbID
    const movie = await movieDao.findMovieByImdbID(imdbID)
    res.json(movie)
}

module.exports = (app) => {
    app.post('/api/likes', likeMovie)
    app.post('/api/dislikes', dislikeMovie)
    app.get('/api/movies/:imdbID', findMovieByImdbID)
}