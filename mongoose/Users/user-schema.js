import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {type: String, required: true, unique: true},         // unique will enforce uniqueness on username
    emailOrNumber: {type: String, required: true, unique: true},    // and email. It will throw error on creating
    isCritic: {type: Boolean, default: false},                      // duplicate
    isAdmin: {type: Boolean, default: false},
    password: {type: String, required: true},
    dateJoined: {type:Date, default: Date.now}
}, {collection: 'users'});

export default userSchema;