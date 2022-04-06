import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    key: { type: String, required: true },
    user_id: { type: String, required: true },
    user_type: { type: String, required: true, enum:['admin','user'], lowercase:true},  //admin or regular user
    expires_in: { type: Number, default: 3600000 }, //1 hour in milliseconds
    login_time: { type: Date, default: Date.now() },

}, { timestamps: true });

// methods
// returns time of expiry of token
tokenSchema.virtual('expires_at', function () {
    const time = new Date(this.login_time).getTime() + this.expires_in;
    return new Date(time);
});

// returns true, if token is expired
tokenSchema.virtual('is_expired', function () {
    if (new Date.now() < this.expires_at) {
        return true
    } else {
        return false
    }
});

export const Token = mongoose.model('tokens', tokenSchema);