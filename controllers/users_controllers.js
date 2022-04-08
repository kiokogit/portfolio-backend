import { User } from "../models/user_model.js"

export const get_profile = async (req, res) => {
    //from verify_token, req.user_id
    const { user_id } = req
    try {
        //id passed is a string version of mongoDB's _id. Cannot use findById
        //exclude password
        const user = await User.findOne({ id: user_id }, { password: 0 }).lean();
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send('Could not fetch profile')
    }
};