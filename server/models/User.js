const {Schema, model} = require('../db/connection');

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String},
});

const User = model('User', UserSchema);

module.exports = User;