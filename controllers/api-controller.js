const API_KEY = 'k_ouq4szjo';
const API_URL = 'https://imdb-api.com/en/API';
import apiDao from "../dao/api-dao.js";
import axios from "axios";

const findDetailsByImdbID = async (req, res) => {
    const requestedMovie = req.params.imdbID;
    const movieDetails = await apiDao.findMovieByImdbID(requestedMovie);
    res.json(movieDetails);
}
/*
const findMoviesBySearch = async(req, res) => {
    const searchExpression = req.params();
    const movies = await apiDao.findMoviesBySearch(searchExpression);
    res.json(movies);
}
 */

//Professor Search
const searchByTitle = async (movieSearch) => {
    const searchString  = movieSearch;
    const response = await axios.get(`${searchUrl}&s=${searchString}`);
    setMovies(response.data.Search)
    titleSearchRef.current.value = searchString
    navigate(`/search/${searchString}`)
}

export default(app) => {
    app.get(`${API_URL}/Search/${API_KEY}/:id/Trailer`, findDetailsByImdbID);
    app.get(`${API_URL}/Search/${API_KEY}/:expression`, searchByTitle);
}