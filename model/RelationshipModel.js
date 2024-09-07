const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationshipSchema = new Schema({
    userEmail: { type: String },
    connectedUserEmail: { type: String},
    type: { type: String, enum: ['friend', 'follower']},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Relationship', RelationshipSchema);
