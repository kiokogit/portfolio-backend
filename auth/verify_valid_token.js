import {Token} from '../models/token_model.js'
import { del_token } from '../tokens/del_token.js';

export async function verify_token(req, res, next) {
    try {
        const key = req.headers['authorization'].split(' ')[1];

        const token = await Token.findOne({ key })
        if (!token.is_expired) {
            //token not expired still
            //send token key(to be returned as header to user)
            res.setHeader('authorization', token.key);
            //push user id
            req.user_id = token.user_id
            next()
        } else {
            //delete token if already expired; or extend time
            console.log('Expired')
            await del_token(token.key)
            res.status(403).send('Session token expired. You must login again to continue');
        }
    } catch (e) {
        console.log(e.message)
        res.status(403).send('User forbidden from access. User Not Logged In.')
    }
}