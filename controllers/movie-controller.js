import * as moviesDao from "../dao/movies-dao.js";


const movieController = (app) => {
    app.get('/api/movies', findAllMovies);
    app.get('/api/movies/:mid', findMovieById);
    app.post('/api/movies', createMovie);
    app.delete('/api/movies/:mid', deleteMovie);
    app.put('/api/movies/:mid', updateMovie);
}

const findAllMovies = async (req, res) => {
    return await moviesDao.findAllMovies().then(movie => res.json(movie));
}

const findMovieById = async (req, res) => {
    const movieId = req.params.mid;
    return await moviesDao.findMovieById(movieId).then(movie => res.json(movie));
}

const createMovie = async (req, res) => {
    return await moviesDao.createMovie(req.body).then(movie => res.json(movie));
}

const deleteMovie = async (req, res) => {
    const movieId = req.params.mid;
    return await moviesDao.deleteMovie(movieId).then(status => res.json(status));
}

const updateMovie = async (req, res) => {
    const movieId = req.params.mid;
    const updatedMovie = req.body;
    return await moviesDao.updateMovie(movieId, updatedMovie).then(status => res.json(status));
}


export default movieController;
