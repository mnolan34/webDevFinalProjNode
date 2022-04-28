import * as bookmarksDao from "../dao/bookmarks-dao.js";


const bookmarksController = (app) => {
    app.get('/api/users/:uid/bookmarks', findAllMoviesBookmarkedByUser);
    app.get('/api/movies/:mid/bookmarks', findAllUsersThatBookmarkedMovie);
    app.get('/api/users/:uid/bookmarks/:mid', findUserBookmarkedMovie);
    app.post('/api/users/:uid/bookmarks/:mid', userBookmarksMovie);
    app.delete('/api/users/:uid/bookmarks/:mid', userUnbookmarksMovie);
    app.get('/api/users/:uid/bookmarks/toggle/:mid', userTogglesBookmark);
    app.delete('/api/movies/:mid/bookmarks', deleteAllBookmarksOfMovie);
}


const findAllMoviesBookmarkedByUser = async (req, res) => {
    const uid = req.params.uid;
    return await bookmarksDao.findAllMoviesBookmarkedByUser(uid)
        .then(bookmarks => res.json(bookmarks));
}


const findAllUsersThatBookmarkedMovie = async (req, res) => {
    return await bookmarksDao.findAllUsersThatBookmarkedMovie(req.params.mid)
        .then(bookmarks => res.json(bookmarks));
}


const findUserBookmarkedMovie = async (req, res) => {
    const uid = req.params.uid;
    const mid = req.params.mid;
    return await bookmarksDao.findUserBookmarkedMovie(uid, mid)
        .then(bookmark => res.json(bookmark));
}


const userBookmarksMovie = async (req, res) => {
    console.log("inside user bookmarks Movie");
    console.log(req.params.uid, req.params.mid);
    return await bookmarksDao.userBookmarksMovie(req.params.uid, req.params.mid)
        .then(bookmark => res.json(bookmark));
}


const userUnbookmarksMovie = async (req, res) => {
    return await bookmarksDao.userUnbookmarksMovie(req.params.uid, req.params.mid)
        .then(status => res.send(status));
}


const userTogglesBookmark = async (req, res) => {
    // not sure how to enforce log in here
    const userId = req.params.uid;
    const mid = req.params.mid;

    try {
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
        res.sendStatus(404);
    }
}


const deleteAllBookmarksOfMovie = async (req, res) => {
    await bookmarksDao.deleteAllBookmarksOfMovie(req.params.mid)
        .then(status => res.send(status));
}


// exports so server.js can import
export default bookmarksController;