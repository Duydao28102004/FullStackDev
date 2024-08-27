const {Schema, model} = require('../db/connection');

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const Comment = model('Comment', CommentSchema);
module.exports = Comment;
