import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {type:String, required: true},
    emailOrNumber: {type: String, required: true},
    isCritic: {type: Boolean, required: true},
    isAdmin: {type: Boolean, required: true},
    password: {type: String, required: true},
    dateJoined: {type:Date, default: Date.now()}
}, {collection: 'users'});

export default userSchema;