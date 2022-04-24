import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    movieTitle: {type: String, required: true},
    imdbID: {type:String, required: true},
    moviePoster: {type: String},
    // movieTrailer: {type: JSON},          Difficult to maintain. Consider remove it in next commit
    movieDescription: {type: String},
    // parentRating: {type: String},        Difficult to maintain. Consider remove it in next commit
    yearReleased: {type: String}
    // similarMovies: {type: JSON}          Difficult to maintain. Consider remove it in next commit
}, { collection: 'movies' });

export default movieSchema;