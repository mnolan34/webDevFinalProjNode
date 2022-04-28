/**
 * @file Controller RESTful web service API for bookmarks resource
 */
import * as bookmarksDao from "../dao/bookmarks-dao.js";
import * as moviesDao from "../dao/movies-dao.js";

/**
 * Function that handles the url endpoints for the bookmarks resource
 * @param {Express} app Express instance to declare the RESTful web service API
 */
const bookmarksController = (app) => {
    app.get('/api/users/:uid/bookmarks', findAllMoviesBookmarkedByUser);
    app.get('/api/movies/:mid/bookmarks', findAllUsersThatBookmarkedMovie);
    app.get('/api/users/:uid/bookmarks/:mid', findUserBookmarkedMovie);
    app.post('/api/users/:uid/bookmarks/:mid', userBookmarksMovie);
    app.delete('/api/users/:uid/bookmarks/:mid', userUnbookmarksMovie);
    app.get('/api/users/:uid/bookmarks/toggle/:mid', userTogglesBookmark);
    app.delete('/api/movies/:mid/bookmarks', deleteAllBookmarksOfMovie);
    app.get('/api/titles/:titleId/bookmarks', isMovieBookmarkedbyUser);
}

/**
 * Retrieves all movies bookmarked by a user from the database
 * @param {Request} req The request from the client, 
 * including the path parameter uid representing the user who has bookmarked a movie
 * @param {Response} res The response to the client, 
 * including the body as a JSON array containing the relevant movie objects
 */
const findAllMoviesBookmarkedByUser = async (req, res) => {
    const uid = req.params.uid;
    return await bookmarksDao.findAllMoviesBookmarkedByUser(uid)
        .then(bookmarks => res.json(bookmarks));
}

/**
 * Retrieves all users that bookmarked a movie from the database
 * @param {Request} req The request from the client, 
 * including the path parameter id representing the movie that has been bookmarked
 * @param {Response} res The response to the client, 
 * including the body as a JSON array containing the relevant user objects
 */
const findAllUsersThatBookmarkedMovie = async (req, res) => {
    return await bookmarksDao.findAllUsersThatBookmarkedMovie(req.params.mid)
        .then(bookmarks => res.json(bookmarks));
}

/**
 * Retrieves the bookmark object given the user and movie from the database
 * @param {Request} req The request from the client, 
 * including the path parameters uid and mid representing the user who bookmarked 
 * the movie and the movie that was bookmarked
 * @param {Response} res The response to the client, 
 * including the body as a JSON array containing the relevant user objects
 */
const findUserBookmarkedMovie = async (req, res) => {
    const uid = req.params.uid;
    const mid = req.params.mid;
    return await bookmarksDao.findUserBookmarkedMovie(uid, mid)
        .then(bookmark => res.json(bookmark));
}

/**
 * Creates a bookmark record in the database
 * @param {Request} req The request from the client, 
 * including the path parameters uid and mid representing the user bookmarking 
 * the movie and the movie being bookmarked
 * @param {Response} res The response to the client, 
 * including the body as a JSON object containing the new bookmark
 */
const userBookmarksMovie = async (req, res) => {
    console.log("inside user bookmarks Movie");
    console.log(req.params.uid, req.params.mid);
    return await bookmarksDao.userBookmarksMovie(req.params.uid, req.params.mid)
        .then(bookmark => res.json(bookmark));
}

/**
 * Deletes a bookmark record in the database
 * @param {Request} req The request from the client, 
 * including the path parameters uid and mid representing the user unbookmarking 
 * the movie and the movie being unbookmarked
 * @param {Response} res The response to the client, 
 * including status on whether deleting the bookmark was successful or not
 */
const userUnbookmarksMovie = async (req, res) => {
    return await bookmarksDao.userUnbookmarksMovie(req.params.uid, req.params.mid)
        .then(status => res.send(status));
}

/**
 * Adds or removes the bookmark for a movie and user
 * @param {Request} req The request from the client, 
 * including the path parameters uid and mid representing the user bookmarking 
 * the movie and the movie being bookmarked
 * @param {Response} res The response to the client, 
 * including status on whether toggling the bookmark was successful or not
 */
const userTogglesBookmark = async (req, res) => {
    // not sure how to enforce log in here
    const userId = req.params.uid;
    try {
        const mid = !req.params.mid.startsWith('tt')? req.params.mid: await moviesDao.getMovieIdByImdbId(req.params.mid).then(movie => movie._id);
        const userHasBookmarkedMovie = await bookmarksDao.findUserBookmarkedMovie(userId, mid);
        if (userHasBookmarkedMovie) {
            // unbookmark
            await bookmarksDao.userUnbookmarksMovie(userId, mid);
            res.send({ isBookmarked: false });
        } else {
            // bookmark
            await bookmarksDao.userBookmarksMovie(userId, mid);
            res.send({ isBookmarked: true });
        }
    } catch (e) {
        res.set('Cache-Control', 'no-store').sendStatus(404);
    }
}

/**
 * Deletes all bookmark records for the given movie, for all users in the database
 * @param {Request} req The request from the client, including the path parameters mid 
 * representing the movie who's bookmarks are to be removed
 * @param {Response} res The response to the client, 
 * including status on whether deleting the bookmark was successful or not
 */
const deleteAllBookmarksOfMovie = async (req, res) => {
    await bookmarksDao.deleteAllBookmarksOfMovie(req.params.mid)
        .then(status => res.send(status));
}

/**
 * Checks whether the currently signed in user has the given movie in their bookmarks
 * @param {Request} req The request from the client, including the path parameters titleId 
 * representing the movie who's bookmark is being checked
 * @param {Response} res The response to the client, 
 * including the body as a JSON array containing the boolean of whether the bookmark exists
 */
const isMovieBookmarkedbyUser = async (req, res) => {
    const profile = req.session['profile'];

    // Unauthenticated
    if (!profile) res.sendStatus(401);

    // For authenticated user
    else {
        const userID = profile.userID;
        res.set('Cache-Control', 'no-store');
        try {
            const movie = await moviesDao.getMovieIdByImdbId(req.params.titleId);
            const mid = movie._id;
            const bookmark = await bookmarksDao.findUserBookmarkedMovie(userID, mid);
            if (bookmark) {
                res.json({
                    isBookmarked: true,
                });
            } else {
                res.json({
                    isBookmarked: false,
                });
            }

        } catch (error) {
            // Throw internal error
            res.sendStatus(500);
        }
    }

}

export default bookmarksController;