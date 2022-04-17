import mongoose from 'mongoose';


const movieSchema = mongoose.Schema({
    movieTitle: String,
    omdbID: String,
    movieImage: String,
    description: String,
    year: Number,
    rating: String
}, { collection: 'movies' });

export default movieSchema;