import { Project } from "../models/user_child_schemas.js";
import { User } from "../models/user_model.js"

//get user profile
export const get_guest_data = async (req, res) => {

    const username = req.query.username;
    try {
        
        const user = await User.find({$or:[{ username: { $regex: username } }, {email:{$regex:username}}]});

        res.status(200).send(user)
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Could not fetch profile')
    }
};

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