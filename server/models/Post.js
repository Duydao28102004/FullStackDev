const {Schema, model} = require('../db/connection');

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: Schema.Types.ObjectId, ref: 'Group' }, // Optional if the post is in a group
    content: { type: String, required: true },
    images: [String],
    visibility: { type: String, enum: ['public', 'friend'], required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
});

const Post = model('Post', PostSchema);
module.exports = Post;
