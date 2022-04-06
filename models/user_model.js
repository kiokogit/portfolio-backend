import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    fname: { type: String, max: 25, min: 3, require: true },
    lname: { type: String, max: 25, min: 3, require: true },
    email: { type: Email, max: 125, required: true },
    password: { type: String, require: true },
    
});

export const User = mongoose.model('users', UserSchema);