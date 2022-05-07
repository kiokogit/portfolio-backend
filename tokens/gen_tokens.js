import { Token } from "../models/token_model.js"
import { v4 as uuidv4 } from 'uuid';
import { GuestToken } from "../models/guest_token_model.js";

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
                key: uuidv4(),
                user_id: user_id
            });
            return user.key;
        }

    } catch (e) {
        console.log(e)
    }
}

//guest token
export async function gen_guest_token(user_id) {

    try {
        const token = await GuestToken.create({
            key: uuidv4(),
            user_id: user_id,
        });

        return token.key;
    } catch (e) {
        console.log(e);
    }
}