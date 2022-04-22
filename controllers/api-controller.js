const API_KEY = 'k_ouq4szjo';
const API_URL = 'https://imdb-api.com/en/API';
import apiDao from "../dao/api-dao.js";
import axios from "axios";


//This will pull the ImdbId from the search engine
const pullImdbId = async (req, res) => {
    const searchedMovie = req.params.title;
    const movieJSON = axios.get(`${API_URL}/Search/${API_KEY}/${searchedMovie}`);
    res.json(movieJSON);
}

//This will pull the movie details from the Imdb API
const pullMovieDetails = async(req, res) => {
    const chosenMovieID = req.params.imdbID;
    const movieDetails = axios.get(`${API_URL}/Title/${API_KEY}/${chosenMovieID}/Posters,Images,Trailer,Wikipedia,`);
    res.json(movieDetails);
}



const findDetailsByImdbId = async (req, res) => {
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

export default(app) => {
    app.get(`/api/search/:mid`, searchByTitle);
    app.get(`/api/titles/:titleId`, findDetailsByImdbId);
    //app.get(`${API_URL}/Search/${API_KEY}/:id/Trailer`, findDetailsByImdbID);
    //app.get(`${API_URL}/Search/${API_KEY}/:expression`, searchByTitle);
}