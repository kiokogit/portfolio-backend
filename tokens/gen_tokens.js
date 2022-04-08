import { Token } from "../models/token_model.js"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export const gen_user_token = async(user_id) => {

    //find token with that Id:
    try {
        const token_exists = await Token.findOne({user_id});
        if (token_exists) {
            return token_exists.key;
        } //go ahead and login, or issue new token
        else {
            //submit hashed code
        const user = await Token.create({
            key: await bcrypt.hash(uuidv4(), 6),
            user_id: user_id,
            user_type: 'user',
        });
        return user.key;
        }

    } catch (e) {
        return null
    }
}