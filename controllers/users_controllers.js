import { Project } from "../models/user_child_schemas.js";
import { User } from "../models/user_model.js"

//get user profile
export const get_profile = async (req, res) => {
    //from verify_token, req.user_id
    const { user_id } = req //searched by this user - use in logs later
    //if user_id available, then search is done by authenticated user. provide more details
    let { profile_user_id } = req.params;
    if (profile_user_id === '0') profile_user_id = user_id;
    try {
        //id passed is a string version of mongoDB's _id. Cannot use findById
        //exclude password
        const user = await User.findOne({ id: profile_user_id }, { credentials: 1, social_media: 1 });
        res.status(200).send(user)
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Could not fetch profile')
    }
};

//edit profile
export const edit_profile = async (req, res) => {
    const { user_id } = req
    const body = req.body //only the details to be updated
    try {
        //update
        const user_updated = await User.updateOne({ id: user_id }, body)
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
        const profile = await User.findOne({ id: user_id });
        res.status(200).send(profile[category])

    } catch (e) {
        console.log(e.message)
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
    const { project_details } = req.body
    
    try {
        const edit = await Project.updateOne({ id: project_id, project_owner_id: user_id }, project_details);
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
        const project = await Project.findOne({id:project_id})
        switch (action_type) {
            case 'like':
                //number of likes === likes.length
                const new_likes = project.likes.push(user_id)
                await Project.findOneAndUpdate({id:project_id}, {likes:new_likes} )
                res.status(200).send('You Liked the project')
                break;
            
            case 'comment':
                const new_comment = {
                    by: user_id,
                    body: req.body,
                    time: new Date()
                };
                const total_comments = project.comments.push(new_comment);
                await Project.findOneAndUpdate({id:project_id}, {comments:total_comments} )
                res.status(200).send('You commented on the project')
                
            default:
                res.status(200).send('Unknown Action type')
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
        await Project.findOneAndRemove({ id: project_id, project_owner_id:user_id});
        res.status(200).send('Project Deleted')
    } catch (e) {
        res.status(500).send('Not deleted')
    }
}

//add a new project
export const add_project = async (req, res) => {
    const { user_id } = req           //from verify token - project owner id
    const { project_details } = req.body
    
    try {
        const new_project = await Project.create({ project_owner_id: user_id, ...project_details });
        res.status(201).send(new_project);
        
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Error occurred, not added');
    }
};

//Search querries
