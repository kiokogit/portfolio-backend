import { User } from "../models/user_model.js";
import bcrypt from 'bcryptjs';

export async function change_password(req, res) {
    //change password, not reset password
    //user is logged in, authenticates true
    const { user_id } = req;
    const { old_password, new_password } = req.body;

    try {

        const user = await User.findOne({ id: user_id }).lean();

        if (await bcrypt.compare(old_password, user.password)) {
            const changed_password = await bcrypt.hash(new_password, 5);
            await User.updateOne({ id: user_id }, {  password: changed_password });
            res.status(200).send('Password Changed successfully')
        } else {
            res.status(403).send('Forbidden Access. Cannot change password');
        };
        
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Error: Not executed')
    }
};

export const reset_user_password = async (req, res) => {
    
    const { user_email } = req.body;
    try {
        //send email function, request for new email in new link

    } catch (e) {
        console.log(e)
    }
}