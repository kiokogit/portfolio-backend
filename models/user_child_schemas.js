import mongoose from 'mongoose';
import { nationalitiesAPI } from '../APIs/countries.js';
import { gender_and_pronouns, religious_affiliations, relationship_status } from '../APIs/other_constants.js';

//child schemas

//credentials
export const credentialsSchema = {

    fname: { type: String, maxlength: 25, min: 3, required: true },
    lname: { type: String, maxlength: 25, min: 3, required: true },
    email: { type: String, maxlength: 125, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    profile_pic:{type:String}

}

//bio data
export const userBioSchema = {

    about: { type: String, alias:'bio'},
    id_number: { type: Number, alias:'id_no' },
    passport_number: { type: String, alias:'pass_no' },
    driving_license_number: { type: String, alias:'dl'},
    date_of_birth: { type: Date, alias:'dob'},
    gender: { type: String, enum: gender_and_pronouns.gender, lowercase: true, alias:'sex' },
    pronouns: { type: String, enum: gender_and_pronouns.pronouns, lowercase: true },
    nationality: { type: String, enum: nationalitiesAPI },
    religion: { type: String, enum: religious_affiliations },
    relationship_status:{type:String, alias:'status', enum:relationship_status}
    
}

//contacts data
export const contactSchema = {

    phone_number: { type: Number, minLength: 10, maxLength: 10, trim: true, alias:'phone_1' },
    alt_phone_number: { type: Number, minLength: 10, maxLength: 10, trim: true, alias:'phone_2' },
    
}

//social media handles
export const socialSchema = {

    facebook: { type: String },
    twitter: { type: String },
    linkedIn: { type: String },
    instagram: { type: String },
    gitHub:{type:String}

}

//projects
const projectSchema = mongoose.Schema({

    project_owner_id: { type: String, required: true, alias: 'user_id' },
    title: { type: String },
    description: { type: String },
    skills: [{ type: String, trim: true }],
    project_documentation_link: { type: String, alias: 'docs' },
    project_final_link: { type: String, alias: 'link' },
    images: [String], //base 64 string rep of images
    date_started: { type: Date },
    completed: { type: Boolean, default: false },
    date_completed: { type: Date },
    likes: [{ type: Object }],
    comments: [Object]

}, {timestamps:true});
export const Project = mongoose.model('project', projectSchema)

//referees
export const refereeSchema = {

    title:{type: String},
    full_name: { type: String, required: true },
    designation: { type: String },
    company_name: { type: String },
    company_address: { type: String },
    phone_number: { type: Number },
    email: { type: String }

}

//experience
//education
//hobbies
//languages
//awards
//responsibilities/leadership
