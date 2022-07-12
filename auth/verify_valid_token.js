import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function verify_token(req, res, next) {
    try {
        //for personal profile after login - bearer token
        const key = req.headers['authorization'].split(' ')[1];

        jwt.verify(key, process.env.JWTSECRET, (err, decoded)=>{
            if(err){
                let message = err.message
                if(err.name==="TokenExpiredError") message = 'Session expired! login again'
                if(err.name==="JsonWebTokenError") message = 'Session auth failed. login again'
                
                console.log(err.message)
                res.status(403).send(message)
            } else {
                req.user_id = decoded.user_id
                next()
            }
        })

    } catch (e) {
        //user not known, unauthenticated
        console.log(e.message)
        res.status(401).send('Forbidden. User Not Logged In.')
    }
}


export const verify_guest_token = async (req, res, next) => {

    //guest key is passed in as a param in the guest link;
    next()
};