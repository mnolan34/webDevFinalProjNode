import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateJoined: Date
}, {collection: 'users'});

export default userSchema;