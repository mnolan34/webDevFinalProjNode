import mongoose from 'mongoose';

const tuitSchema = mongoose.Schema({
    tuit: String,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    avatarImage: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png"},
    postedBy: {
        username: {type: String, default: "NASA"}
    }
}, {collection: 'tuits'});

export default tuitSchema;