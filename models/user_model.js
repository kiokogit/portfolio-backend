import mongoose from 'mongoose';
import { contactSchema, projectSchema, socialSchema, userBioSchema, credentialsSchema } from './user_child_schemas.js';

const userSchema = new mongoose.Schema({

    credentials: credentialsSchema,
    //children
    user_bio: userBioSchema,
    contacts: contactSchema,
    projects: projectSchema,
    social_media: socialSchema,

});

// custom methods for the model
// fullname - returns the two names joined
userSchema.virtual('fullname').get(function () {
    return (this.credentials.fname + ' ' + this.credentials.lname)
});

//virtual method
userSchema.static('findByEmail', function (email) {
    return this.findOne({ email: email })
});

export const User = mongoose.model('user', userSchema);
