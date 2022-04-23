import mongoose from 'mongoose';


const movieSchema = mongoose.Schema({
    movieTitle: {type: String, required: true},
    imdbID: {type:String, required: true},
    moviePoster: {type: String},
    movieTrailer: {type: JSON},
    movieDescription: {type: String},
    parentRating: {type: String},
    yearReleased: {type: String},
    similarMovies: {type: JSON}
}, { collection: 'movies' });

export default movieSchema;