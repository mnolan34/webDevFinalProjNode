import mongoose from 'mongoose';
const movieSchema = mongoose.Schema({
    movieTitle: String,
    omdbID: String
}, {collection: 'movies'});

export default movieSchema;