import mongoose from 'mongoose';

//child schemas
//projects
const projectSchema = mongoose.Schema({

    user_id: { type: mongoose.SchemaTypes.ObjectId, required: true, ref:'user' },
    title: { type: String, required:true},
    description: { type: String },
    skills: {type:Array},
    project_documentation_link: { type: String, alias: 'docs' },
    project_final_link: { type: String, alias: 'link' },
    gallery: [String], //base 64 string rep of images
    date_started: { type: Date },
    completed: { type: Boolean, default: false },
    date_completed: { type: Date },
    likes: {type:Array},
    comments: {type:Array}

}, {timestamps:true});
export const Project = mongoose.model('project', projectSchema)

//experience
//education
//hobbies
//languages
//awards
//responsibilities/leadership
