import mongoose from 'mongoose';
import { nationalitiesAPI } from '../APIs/countries.js';
import { gender_and_pronouns, religious_affiliations, relationship_status } from '../APIs/other_constants.js';

const userSchema = new mongoose.Schema({

    //credentials
    fname: { type: String, maxlength: 25, min: 3, required: true },
    lname: { type: String, maxlength: 25, min: 3, required: true },
    email: { type: String, maxlength: 125, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    profile_pic: { type: String },

    //user_bio
    about: { type: String, alias: 'bio' },
    id_number: { type: Number, alias: 'id_no' },
    passport_number: { type: String, alias: 'pass_no' },
    driving_license_number: { type: String, alias: 'dl' },
    date_of_birth: { type: Date, alias: 'dob' },
    gender: { type: String, enum: gender_and_pronouns.gender, lowercase: true, alias: 'sex' },
    pronouns: { type: String, enum: gender_and_pronouns.pronouns, lowercase: true },
    nationality: { type: String, enum: nationalitiesAPI },
    religion: { type: String, enum: religious_affiliations },
    relationship_status: { type: String, alias: 'status', enum: relationship_status },
    
    //contacts
    phone_number: { type: Number, minLength: 10, maxLength: 10, trim: true, alias: 'phone_1' },
    alt_phone_number: { type: Number, minLength: 10, maxLength: 10, trim: true, alias: 'phone_2' },
    
    //social
    facebook: { type: String },
    twitter: { type: String },
    linkedIn: { type: String },
    instagram: { type: String },
    gitHub: { type: String },
    
    //referees
    referees: [
        {
            title: { type: String },
            full_name: { type: String, required: true },
            designation: { type: String },
            company_name: { type: String },
            company_address: { type: String },
            phone_number: { type: Number },
            email: { type: String }
        }
    ]

});

export const User = mongoose.model('user', userSchema);
