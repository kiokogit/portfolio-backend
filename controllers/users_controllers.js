import { User } from "../models/user_model.js"

//get user profile
export const get_profile = async (req, res) => {
    //from verify_token, req.user_id
    const { user_id } = req
    try {
        //id passed is a string version of mongoDB's _id. Cannot use findById
        //exclude password
        const user = await User.findOne({ id: user_id }, { credentials: { password: 0 }}).lean();
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send('Could not fetch profile')
    }
};

//edit profile
export const edit_profile = async (req, res) => {
    const { user_id } = req
    const user = req.body //only the details to be updated
    
    try {
        //update
        const user_updated = await User.updateOne({ id: user_id }, user)
        //user_updated = {"acknowledged":Boolean}
        if (user_updated.acknowledged) res.status(200).send('User details updated successfully.')
        else res.status(401).send('No changes made on profile.')
    } catch (e) {
        console.log(e.message)
        res.status(500).send('System Error. Profile update failed')
    }
}

//fetch specified profile details