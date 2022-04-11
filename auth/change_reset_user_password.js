import { User } from "../models/user_model.js";
import bcrypt from 'bcryptjs';

export async function change_password(req, res) {
    //change password, not reset password
    //user is logged in, authenticates true
    const { user_id } = req;
    const { old_password, new_password } = req.body;

    try {

        const user_password = await User.findOne({ id: user_id }, { credentials: { password: 1 }});
        if (bcrypt.compare(user_password, old_password)) {
            const changed_password = bcrypt.hash(new_password, 5);
            await User.updateOne({ id: user_id }, { credentials: { password: changed_password } });
            res.status(200).send('Password Changed successfully')
        } else {
            res.status(403).send('Forbidden Access. Cannot change password');
        };
        
    } catch (e) {
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