import mongoose from 'mongoose';

// token generated every login, deleted every logout or if found as expired
const sessionTokenSchema = new mongoose.Schema({
    key: { type: String, required: true },
    user_id: { type: String, required: true },
    user_type: { type: String, required: true, enum:['admin','user'], lowercase:true},  //admin or regular user
    expires_in: { type: Number, default: 3600000 }, //1 hour in milliseconds

}, { timestamps: true });

// methods
// returns time of expiry of token
sessionTokenSchema.virtual('expires_at', function () {
    const time = new Date(this.createdAt).getTime() + this.expires_in;
    return new Date(time);
});

// returns true, if token is expired
sessionTokenSchema.virtual('is_expired', function () {
    if (new Date.now() > this.expires_at) {
        return true
    } else {
        return false
    }
});

export const Token = mongoose.model('token', sessionTokenSchema);