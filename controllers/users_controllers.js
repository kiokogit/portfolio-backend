import { Project } from "../models/user_child_schemas.js";
import { User } from "../models/user_model.js"

//current user profile
export const get_current_profile = async(req, res) => {
    const { user_id } = req;
    try {
        const user = await User.findById(user_id)
                                .select({password:0});
        res.status(200).send(user)
        
    } catch (e) {
        res.status(500).send('Cannot fetch user profile')
    }
}
//edit profile
export const edit_profile = async (req, res) => {
    const { user_id } = req
    const body = req.body //only the details to be updated as json
    try {
        //update
        await User.findByIdAndUpdate(user_id, body)
        //user_updated = {"acknowledged":Boolean}; returns true if at least one item has been edited
        //return edited profile?
        //what if it can return only the updated part?
        //WHAT IF WE JUST REDIRECT TO Profile ROUTE
        res.redirect('http://localhost:5000/user/auth/profile/get_current')
        res.end;
    } catch (e) {
        console.log(e.message)
        res.status(500).send('System Error. Profile update failed')
    }
}


//get all profiles
export const get_all_user_profiles = async (req, res) => {
    try {
        const profiles = await User.find()
                                    .select({fname:1, lname:1, username:1, email:1 })
        res.status(200).send(profiles);
    } catch (e) {
        res.status(404).send(e.message)
    }
}

//PROJECTS
//all projects with all details
export const get_user_projects = async (req, res) => {
    const { user_id } = req
    
    try {
        const projects = await Project.find({user_id:new String(user_id)})
        res.status(200).send(projects);

    } catch (e) {
        console.log(e)
    }
}

//get first 3 projects(for brief show of thumbnails and title)
export const projects_in_brief = async(req, res) =>{
   const {user_id} = req
   const {n} = req.query
   
   try {
        const projects = await Project
                            .find({user_id:new String(user_id)})
                            .select({title:1})
                            .limit(n)
                            .sort("-updatedAt")

        res.status(200).send(projects)
        
   } catch(e) {
        console.log(e)
   }
}

//get one project details
export const get_one_project_details = async (req, res) => {
    const { q } = req.query
    
    try {
        const project = await Project.findById(q)
        res.status(200).send(project);

    } catch (e) {
        console.log(e)
    }
}


//edit user projects - by user
export const edit_project = async (req, res) => {
    //user must be logged in 
    const { user_id } = req
    const { project_id } = req.params
    const project_details = req.body
    
    try {
        const edit = await Project.updateOne({ _id: project_id, user_id: user_id }, project_details);
        if (edit.acknowledged) res.status(200).send('Project Details Updated');
                    
        else res.status(200).send('Project details not changed');
        
    } catch (e) {
        console.log(e);
    }
};

export const like_comment_projects = async (req, res) => {
    const{user_id} = req
    const { project_id} = req.params;
    const { action_type } = req.params;

    try {
        const project = await Project.findById(project_id)
        switch (action_type) {
            case 'like':
                //number of likes === likes.length
                project.likes.push(user_id)
                await Project.findOneAndUpdate({_id:project_id}, {likes:project.likes} )
                res.status(200).send('You Liked the project')
                break;
            
            case 'comment':
                const new_comment = {
                    by: user_id,
                    body: req.body,
                    time: new Date()
                };
                project.comments.unshift(new_comment);
                await Project.findOneAndUpdate({_id:project_id}, {comments:project.comments} )
                res.status(200).send('You commented on the project')
                
            default:
                break;
        }

    } catch (e) {
        console.log(e);   
        res.status(500).send('Error occurred')
    }
}

//del project, by user and owner only
export const del_project = async(req, res) => {
    //user must be logged, and be owner
    const {user_id} = req
    const { project_id } = req.params;

    try {
        await Project.findOneAndRemove({ _id: project_id, user_id:user_id});
        res.status(200).send('Project Deleted')
    } catch (e) {
        res.status(500).send('Not deleted')
    }
}

//add a new project
export const add_project = async (req, res) => {
    const { user_id } = req           //from verify token - project owner id
    const project = req.body
    
    try {
        await Project.create({ user_id: user_id, ...project });
        res.status(201).send('Project Created Successfully');
        
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Error occurred, not added');
    }
};

