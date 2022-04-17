const API_KEY = 'k_12345678';
const API_URL = 'https://imdb-api.com/en/api';

const connectionController = (app) => {
    app.get(`${API_URL}/SearchMovie/${API_KEY}/:titleString`, searchMovie);

}


//Need to Search via the title
//Should pull the movie ID from here
const searchMovie = async (req, res) => {
    const titleString = req.params();
    const movieUrl = res.send();

}