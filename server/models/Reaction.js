const {Schema, model} = require('../db/connection');

const ReactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }, // Optional if reacting to a post
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' }, // Optional if reacting to a comment
    type: { type: String, enum: ['like', 'love', 'haha', 'angry'], required: true }
});

const Reaction = model('Reaction', ReactionSchema);
module.exports = Reaction;