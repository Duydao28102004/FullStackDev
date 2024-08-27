const {Schema, model} = require('../db/connection');

const GroupSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    visibility: { type: String, enum: ['public', 'private'], required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    pendingRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    approved: { type: Boolean, default: false },
});

const Group = model('Group', GroupSchema);
module.exports = Group;
