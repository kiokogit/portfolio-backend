import mongoose from 'mongoose';

const TokenSchema = mongoose.Schema({
    key: { type: String, required: true },
    user: { type: Object, required: true },
    user_type: { type: String, required: true },
    expires_in: { type: Number, default: 60 },
    expired:{type: Boolean, default: false},
})

export const Token = mongoose.model('tokens', TokenSchema);