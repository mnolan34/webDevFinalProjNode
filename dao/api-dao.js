import moviesModel from "../mongoose/Movies/movie-model.js";

const findMovieByImdbID = async (imdbID) => {
    return moviesModel.findOne({_id: imdbID})
}

const likeMovie = async (movie) => {
    let actualMovie = {}
    // try {
    const existingMovie = await moviesModel.findOne({imdbID: movie.imdbID})
    // } catch (e) {
    //   console.log(e)
    // }
    if(existingMovie) {
        // update
        const status = await moviesModel.updateOne({imdbID: movie.imdbID},
            {$set: {likes: existingMovie.likes + 1}})
        actualMovie = {...existingMovie, likes: existingMovie.likes + 1}
    } else {
        // insert
        actualMovie = await moviesModel.create({
            // title: movie.title,
            // imdbID: movie.imdbID,
            // poster: movie.poster,
            ...movie,
            likes: 1,
            dislikes: 0
        })
    }
    return actualMovie
}


export default{
    findMovieByImdbID,
    likeMovie
};