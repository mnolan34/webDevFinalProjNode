import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    userType: {type: String, enum : ['user', 'critic'], default: 'user'},
    password: String,
    dateJoined: Date
}, {collection: 'users'});

export default userSchema;