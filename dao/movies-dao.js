/**
 * @file Implements DAO managing data storage of movies.
 * Uses mongoose movieModel to integrate with MongoDB
 */
import movieModel from "../mongoose/Movies/movie-model.js";

/**
 * Uses movieModel to retrieve all movie documents from movies collection
 * @returns an array of all movies in the database
 */
export const findAllMovies = () =>
    movieModel.find();

/**
 * Uses movieModel and primary key of movie to find specific movie
 * @param {String} mid primary key of movie in database
 * @returns {JSON} movie JSON of movie and its details will be returned
 */
export const findMovieById = (mid) =>
    movieModel.findOne({ _id: mid });

/**
 * Find movie detail in DB based on IMDB ID
 *
 * @param imdbID
 * @returns {QueryWithHelpers<HydratedDocument<unknown, {}, {}> | null, HydratedDocument<unknown, {}, {}>, {}, unknown>}
 */
export const findMovieByImdbId = (imdbID) =>
  movieModel.findOne({ imdbID: imdbID });

/**
 * Retrieve only _id of a movie in DB based on imdbID
 *
 * @param imdbID
 * @returns {QueryWithHelpers<Pick<Document<unknown>, "_id"> | null, HydratedDocument<unknown, {}, {}>, {}, unknown>}
 */
export const getMovieIdByImdbId = (imdbID) =>
  movieModel.exists({imdbID: imdbID});

export const createMovie = (movie) =>
    movieModel.create(movie);

export const deleteMovie = (mid) =>
    movieModel.deleteOne({ _id: mid });

export const updateMovie = (mid, movie) =>
    movieModel.updateOne({ _id: mid }, { $set: movie });