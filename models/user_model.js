import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    fname: { type: String, maxlength: 25, min: 3, required: true },
    lname: { type: String, maxlength: 25, min: 3, required: true },
    email: { type: String, maxlength: 125, required: true, lowercase:true },
    password: { type: String, required: true },
    
});

// custom methods for the model
// fullname - returns the two names joined
userSchema.virtual('fullname').get(function () {
    return (this.fname + ' ' + this.lname)
});

export const User = mongoose.model('users', userSchema);