import 'dotenv/config'
import jwt from 'jsonwebtoken';

export const gen_user_token = async(user_id) => {

    //find token with that Id:
    try{

        const token = jwt.sign({user_id: user_id}, process.env.JWTSECRET, {expiresIn:50})
        return token

    } catch(e) {
        console.log(e.message)
        return 0
    }
}

//guest token
export async function gen_guest_token(user_id) {

    try {

        return user_id;

    } catch (e) {
        console.log(e);
    }
}