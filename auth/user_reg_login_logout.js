import { User } from "../models/user_model.js";
import bcrypt from 'bcryptjs'
import { gen_user_token } from "../tokens/gen_tokens.js";
import { del_token } from "../tokens/del_token.js";

//register new user
export async function register(req, res) {
    const { fname, lname, email, password } = req.body;

    //check if user exists
    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        await User.create({ fname, lname, email, password: hashedPassword });

        res.status(201).send('User registered successfully')

    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)   
    }
};


//login
export async function login(req, res) {

    const { email, password } = req.body;
    try {
        //check if user available
        const user = await User.findOne({email})
        //check password
        if (bcrypt.compare(password, user.password)) {
            //if passed, generate token
            if (gen_user_token(user.id) === 0 || 1) {
                res.status(200).send('Token generated. Logged in') //everything is okay
            }
        } else {
            res.status(401).send('Wrong Password') //user known, but unauthenticated. Invalid password
        }
    } catch (e) {
        res.status(401).send('User Does not exist') // invalid email; return 403 to hide the mistaken credential
    }
};


//logout
export function logout(req, res) {
    const token_key = req.headers['x-token-key'];

    if (token_key !== 'undefined') {
        del_token(token_key)
        res.status(200).send('User Logged out')
    } else {
        res.status(500).send('No header sent with token')
    }
}