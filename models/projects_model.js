import mongoose from "mongoose";

//project
const projectSchema = mongoose.Schema({

    title: { type: String, required: true }
})