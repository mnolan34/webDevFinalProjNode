import mongoose from 'mongoose';
import BookmarkSchema from "./bookmarks-schema.js";


const bookmarkModel = mongoose.model('BookmarkModel', BookmarkSchema);
export default bookmarkModel;