import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    movieTitle: {type: String, required: true},
    imdbID: {type:String, required: true, unique: true},        // Enforce uniqueness on imdbID
    moviePoster: {type: String},                                // Will throw error on creating duplicate imdbID
    movieDescription: {type: String}
}, { collection: 'movies' });

export default movieSchema;