import mongoose from "mongoose";


const BookmarkSchema = mongoose.Schema(
    {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: "MovieModel" },
        bookmarkedBy: { type: String, ref: "UserModel" }
    }, { collection: "bookmarks" }
);

export default BookmarkSchema;