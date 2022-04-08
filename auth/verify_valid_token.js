import {Token} from '../models/token_model.js'
import { del_token } from '../tokens/del_token.js';

export async function verify_token(req, res, next) {
    try {
        const key = req.headers['authorization'].split(' ')[1];

        const token = await Token.findOne({ key });

        const rem_time = (new Date().getTime() - (token.expires_at).getTime())
        if (token.is_expired) {
            if (rem_time < 300000) {
                //if token has been verified, and expired, add life by 20mins (1200000ms)
                await Token.updateOne({key:token.key}, {hits:token.hits+1});  //static method
                to_next()
            } else {
                await del_token(token.key)
                res.status(403).send('Forbidden. Session Expired. You must Login again');
            }
            
        } else{to_next()}
        //if not expired or refreshed
        //send token key(to be returned as header to user) //push user id to next()
        function to_next() {
            res.setHeader('authorization', token.key);
            req.user_id = token.user_id;
            next()
        }

    } catch (e) {
        //user not known, unauthenticated
        console.log(e.message)
        res.status(401).send('Forbidden. User Not Logged In.')
    }
}