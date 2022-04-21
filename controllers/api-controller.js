const API_KEY = 'k_ouq4szjo';
const API_URL = 'https://imdb-api.com/en/api';
import apiDao from "../dao/api-dao.js";

const findDetailsByImdbID = async (req, res) => {
    const imdbID = req.params();
    const movie = await apiDao.findMovieByImdbID(imdbID);
    res.json(movie);
}

const findMoviesBySearch = async(req, res) => {
    const searchExpression = req.params();
    const movies = await apiDao.findMoviesBySearch(searchExpression);
    res.json(movies);
}

export default(app) => {
    app.get(`${API_URL}/en/API/Title/${API_KEY}/:id/Trailer`, findDetailsByImdbID);
    app.get(`${API_URL}/en/API/Search/${API_KEY}/:expression`, findMoviesBySearch);
}