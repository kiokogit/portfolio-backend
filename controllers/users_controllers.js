import { Project } from "../models/user_child_schemas.js";
import { User } from "../models/user_model.js"

//get user profile
export const get_profile = async (req, res) => {

    const { profile_user_id } = req.params;
    try {
        
        const user = await User.findById(profile_user_id);
        res.status(200).send(user)
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Could not fetch profile')
    }
};

//current user profile
export const get_current_profile = async(req, res) => {
    const { user_id } = req;
    try {
        const user = await User.findById(user_id);
        res.status(200).send(user)
        
    } catch (e) {
        res.status(500).send('Cannot fetch user profile')
    }
}
//edit profile
export const edit_profile = async (req, res) => {
    const { user_id } = req
    const body = req.body //only the details to be updated
    try {
        //update
        const user_updated = await User.updateOne({ _id: user_id }, body)
        //user_updated = {"acknowledged":Boolean}; returns true if at least one item has been edited
        if (user_updated.acknowledged) res.status(200).send('User details updated successfully.')
        else res.status(401).send('No changes made on profile.')
    } catch (e) {
        console.log(e.message)
        res.status(500).send('System Error. Profile update failed')
    }
}

//fetch specified profile details
export const get_profile_details = async (req, res) => {
    const { category, user_id } = req.params;
    try {
        const profile = await User.findById(user_id);
        res.status(200).send(profile[category])

    } catch (e) {
        console.log(e.message)
    }
};

//get all profiles
export const get_all_user_profiles = async (req, res) => {
    try {
        const profiles = await User.find();
        res.status(200).send(profiles);
    } catch (e) {
        res.status(404).send(e.message)
    }
}

//PROJECTS
export const get_user_projects = async (req, res) => {
    const { project_owner_id } = req.params
    
    try {
        const projects = await Project.find({ project_owner_id });
        res.status(200).send(projects);

    } catch (e) {
        console.log(e.message)
    }
}

//edit user projects - by user
export const edit_project = async (req, res) => {
    //user must be logged in 
    const { user_id } = req
    const { project_id } = req.params
    const project_details = req.body
    
    try {
        const edit = await Project.updateOne({ _id: project_id, project_owner_id: user_id }, project_details);
        if (edit.acknowledged) res.status(200).send('Project Details Updated');
                    
        else res.status(200).send('Project details not changed');
        
    } catch (e) {
        console.log(e.message);
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
        console.log(e.message);   
        res.status(500).send('Error occurred')
    }
}

//del project, by user and owner only
export const del_project = async(req, res) => {
    //user must be logged, and be owner
    const {user_id} = req
    const { project_id } = req.params;

    try {
        await Project.findOneAndRemove({ _id: project_id, project_owner_id:user_id});
        res.status(200).send('Project Deleted')
    } catch (e) {
        res.status(500).send('Not deleted')
    }
}

//add a new project
export const add_project = async (req, res) => {
    const { user_id } = req           //from verify token - project owner id
    const project_details = req.body
    
    try {
        const new_project = await Project.create({ project_owner_id: user_id, ...project_details });
        res.status(201).send(new_project);
        
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Error occurred, not added');
    }
};

//Search querries
