import movieModel from "../mongoose/Movies/movie-model.js";

export const findAllMovies = () => movieModel.find();
export const findMovieById = (mid) => movieModel.findOne(mid);
export const createMovie = (movie) => movieModel.create(movie);
export const deleteMovie = (mid) => movieModel.deleteOne({ _id: mid });
export const updateMovie = (mid, movie) => movieModel.updateOne({ _id: mid }, { $set: movie });