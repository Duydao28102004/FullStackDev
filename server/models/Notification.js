const {Schema, model} = require('../db/connection');

const NotificationSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'friend_request', 'group_request', 'reaction'
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Notification = model('Notification', NotificationSchema);
module.exports = Notification;
