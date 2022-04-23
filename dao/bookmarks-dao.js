import BookmarkModel from "../mongoose/Bookmarks/bookmarks-model.js";


export const findAllMoviesBookmarkedByUser = (uid) =>
    BookmarkModel.find({ bookmarkedBy: uid }).populate("movie").exec();

export const findAllUsersThatBookmarkedMovie = (mid) =>
    BookmarkModel.find({ movie: mid }).populate("bookmarkedBy").exec();

export const findUserBookmarkedMovie = (uid, mid) =>
    BookmarkModel.findOne(
        {
                movie: mid,
                bookmarkedBy: uid
                }
        );

export const userBookmarksMovie = (uid, mid) =>
    BookmarkModel.create(
        { movie: mid,
            bookmarkedBy: uid }
    );

export const userUnbookmarksMovie = (uid, mid) =>
    BookmarkModel.deleteOne(
        { movie: mid,
            bookmarkedBy: uid }
    );

export const deleteAllBookmarksOfMovie = (mid) =>
    BookmarkModel.deleteMany({ movie: mid });