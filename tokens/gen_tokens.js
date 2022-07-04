import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid';
import { GuestToken } from "../models/guest_token_model.js";
import jwt from 'jsonwebtoken';

export const gen_user_token = async(user_id) => {

    //find token with that Id:
    try{

        const token = jwt.sign(user_id, process.env.JWTSECRET)
        return token
    } catch(e){
        console.log(e)
        return 0
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