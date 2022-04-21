import mongoose from 'mongoose';


const movieSchema = mongoose.Schema({
    movieTitle: {type: String, required: true},
    omdbID: {type:String, required: true},
    moviePoster: {type: String},
    movieTrailer: {type: String},
    movieDescription: {type: String}
}, { collection: 'movies' });

export default movieSchema;