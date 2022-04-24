import * as movieDao from "../dao/movies-dao.js";

const API_KEY = 'k_ouq4szjo';
const API_URL = 'https://imdb-api.com/en/API';
import axios from "axios";

/**
 * Search for movies based on given query.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const displaySearchDetails = async (req, res) => {
    // Get query params "q"
    const searchedMovie = req.query.q;
    // Run IMDB search API
    try {
        // Handle 20x response
        // Send search request. Throw error if no respond in 15 seconds
        const searchResponse = await axios.get(`${API_URL}/SearchMovie/${API_KEY}/${searchedMovie}`, {timeout: 15000});
        // Parse the response from IMDB API
        const searchResults = searchResponse.data.results;

        // IMDB API server could be busy and give results: null as response.
        // Tell client of gateway timeout (504)
        if (!searchResults) res.sendStatus(504);
        else {
            // Otherwise, proceed as usual.
            const count = searchResults.length;
            const parsedResult = searchResults.map(title => {return {"_id": title.id, "title": title.title, "image": title.image}});

            // Return parsed return
            res.json({count: count, titles: parsedResult});
        }
    }catch (error) {
        // Handle time out and error response (Not 20x)
        res.sendStatus(504);
    }
}

//This will pull the movie details from the Imdb API
const pullMovieDetails = async(req, res) => {
    const chosenMovieID = req.params.imdbID;
    const movieDetails = axios.get(`${API_URL}/Title/${API_KEY}/${chosenMovieID}/Posters,Images,Trailer,Wikipedia,`);
    res.json(movieDetails);
}

const addDetailsToDB = async (req, res) => {
    const requestedMovie = req.params.imdbID;
    const movieDetails = await pullMovieDetails(requestedMovie);
    if(movieDetails){
        //If movie exists, can pull current movie
        res.json(movieDetails);
    }else{
        //If movie not in DB, send it details, add it
        const movieInMongoFormat = {
            movieTitle: {movieDetails}.fullTitle,
            imdbID: {movieDetails}.id,
            moviePoster: {movieDetails}.posters,
            movieTrailer: {movieDetails}.trailer.linkEmbed,
            movieDescription: {movieDetails}.plot,
            parentRating: {movieDetails}.contentRating,
            yearReleased: {movieDetails}.year,
            similarMovies: {movieDetails}.similars
        }
        res.json(await movieDao.createMovie(movieInMongoFormat));
    }
}

/*
const findMoviesBySearch = async(req, res) => {
    const searchExpression = req.params();
    const movies = await apiDao.findMoviesBySearch(searchExpression);
    res.json(movies);
}
 */

export default(app) => {
    app.get(`/api/search`, displaySearchDetails);
    app.get(`/api/titles/:titleId`, addDetailsToDB);
}