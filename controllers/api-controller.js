const API_KEY = 'k_ouq4szjo';
const API_URL = 'https://imdb-api.com/en/API';
import apiDao from "../dao/api-dao.js";

const findDetailsByImdbID = async (req, res) => {
    const requestedMovie = req.params.imdbID;
    const movieDetails = await apiDao.findMovieByImdbID(requestedMovie);
    res.json(movieDetails);
}

const findMoviesBySearch = async(req, res) => {
    const searchExpression = req.params();
    const movies = await apiDao.findMoviesBySearch(searchExpression);
    res.json(movies);
}

export default(app) => {
    app.get(`${API_URL}/Search/${API_KEY}/:id/Trailer`, findDetailsByImdbID);
    app.get(`${API_URL}/Search/${API_KEY}/:expression`, findMoviesBySearch);
}