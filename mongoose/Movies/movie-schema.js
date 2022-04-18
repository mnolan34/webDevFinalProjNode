import mongoose from 'mongoose';


const movieSchema = mongoose.Schema({
    movieTitle: {type: String, required: true},
    omdbID: {type:String, required: true}
}, { collection: 'movies' });

export default movieSchema;