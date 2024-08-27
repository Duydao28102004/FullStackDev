const {Schema, model} = require('../db/connection');

const NotificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'friend_request', 'group_request', 'reaction'
    message: { type: String, required: true },
    seen: { type: Boolean, default: false },
    relatedObject: { type: Schema.Types.ObjectId }, // Could be a post, comment, etc.
});

const Notification = model('Notification', NotificationSchema);
module.exports = Notification;
