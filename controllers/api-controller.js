const API_KEY = 'k_ouq4szjo';
const API_URL = 'https://imdb-api.com/en/api';
import apiDao from "../dao/api-dao.js";

const findMovieByImdbID = async (req, res) => {
    const imdbID = req.params.imdbID
    const movie = await apiDao.findMovieByImdbID(imdbID)
    res.json(movie)
}


export default(app) => {
    app.get('/api/movies/:imdbID', findMovieByImdbID);
}