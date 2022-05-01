import axios from "axios";
import * as moviesDao from "../dao/movies-dao.js";
import { countCommentsByMovieID } from "../dao/comments-dao.js";

const API_KEY = process.env.API_KEY || 'k_7lfgcu9r';
const API_URL = 'https://imdb-api.com/en/API';

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
    const searchResponse = await axios.get(`${API_URL}/SearchMovie/${API_KEY}/${searchedMovie}`, { timeout: 15000 });
    // Parse the response from IMDB API
    const searchResults = searchResponse.data.results;

    // IMDB API server could be busy and give results: null as response.
    // Tell client of gateway timeout (504)
    if (searchResults.errorMessage) res.status(504).send(searchResults.errorMessage);
    else {
      // Otherwise, proceed as usual.
      const count = searchResults.length;
      const parsedResult = await Promise.all(searchResults.map(async title => {
        const movieId = await moviesDao.getMovieIdByImdbId(title.id);
        const commentCount = movieId ? await countCommentsByMovieID(movieId._id) : 0;
        return { "_id": title.id, "title": title.title, "image": title.image, "commentCount": commentCount }
      }));

      // Return parsed return
      res.json({ count: count, titles: parsedResult });
    }
  } catch (error) {
    // Handle time out and error response (Not 20x)
    res.sendStatus(504);
  }
}

/**
 * Pull movie detail from IMDB API.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const pullMovieDetails = async (req, res) => {
  const movieID = req.params.titleId;
  try {
    // Handle 20x response
    // Send detail request. Throw error if no respond in 15 seconds
    const detailResponse = await axios.get(`${API_URL}/Title/${API_KEY}/${movieID}/Trailer,`, { timeout: 15000 });
    // Parse the response from IMDB API
    const movieData = detailResponse.data;

    // IMDB API server could be busy and give error message
    // Tell client of gateway timeout (504)
    if (movieData.errorMessage) res.sendStatus(504);
    // Tell the client if movie not found
    else if (!movieData.id) res.sendStatus(404);
    else {
      // Otherwise, proceed as usual.
      const parsedDetail = {
        "title": movieData.title,
        "plot": movieData.plot,
        "image": movieData.image,
        "trailer": movieData.trailer ? movieData.trailer.linkEmbed : null,
        "similars": !movieData.similars ? [] : movieData.similars.map(similar => {
          return {
            "_id": similar.id,
            "title": similar.title,
            "image": similar.image
          }
        })
      }

      // Update movie detail in local DB as async side effect.
      addDetailsToDB(movieData);

      // Return parsed return
      res.json(parsedDetail);
    }
  } catch (error) {
    // Handle time out and error response (Not 20x)
    res.sendStatus(504);
  }
}

/**
 * Add movie detail to local DB
 *
 * @param movieDetails detail
 * @returns {Promise<void>}
 */
const addDetailsToDB = async (movieDetails) => {
  // Check if this movie is already exist in DB to prevent duplication
  const existMovie = await moviesDao.getMovieIdByImdbId(movieDetails.id);

  // Insert if not exist
  if (!existMovie) {
    const movieInMongoFormat = {
      movieTitle: movieDetails.title,
      imdbID: movieDetails.id,
      moviePoster: movieDetails.image,
      movieDescription: movieDetails.plot
    }
    await moviesDao.createMovie(movieInMongoFormat)
  }
}

export default (app) => {
  app.get(`/api/search`, displaySearchDetails);
  app.get(`/api/titles/:titleId`, pullMovieDetails);
}
