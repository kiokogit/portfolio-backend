/* //NOT IN USE

import mongoose from 'mongoose';

// token generated every login, deleted every logout or if found as expired
const sessionTokenSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    key: { type: String, required: true }, 
    expires_in: { type: Number, default: 600000 }, //20mins in milliseconds
    hits:{type:Number, default:0}

}, { timestamps: true }); //createdAt and updatedAt

// methods
// returns time of expiry of token
sessionTokenSchema.virtual('expires_at').get(function () {
    const time = new Date(this.updatedAt).getTime() + this.expires_in; //use UpdatedAt to track changes
    return new Date(time);
});

// returns true, if token is expired
sessionTokenSchema.virtual('is_expired').get(function () {
    if (new Date(Date.now()) > this.expires_at) {
        return true
    } else {
        return false
    }
});

export const Token = mongoose.model('token', sessionTokenSchema); */