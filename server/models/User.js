const {Schema, model} = require('../db/connection');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
});

const User = model('User', UserSchema);
module.exports = User;
