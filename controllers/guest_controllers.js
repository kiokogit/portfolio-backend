import { User } from "../models/user_model.js"

//get user profile
export const get_guest_data = async (req, res) => {

    const username = req.query.username;
    
    try {
        
        const user = await User
            .find({ username:  username } )
            .select({ password: 0 })
        
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

export const search_profiles = async (req, res) => {
    const { q } = req.query;
    try {
        const user = await User
            .find({ $or: [{ username: { $regex: q } }, { fname: { $regex: q } }, { lname: { $regex: q } }] })
            .sort({ 'username': 1 })
            .select({ fname: 1, lname: 1, username: 1 })
            .limit(10)
            
        res.status(200).send(user)

    } catch (e) {
        console.log(e)
    }
}