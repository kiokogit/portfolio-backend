import { User } from "../models/user_model.js";
import bcrypt from 'bcryptjs'
import { gen_user_token } from "../tokens/gen_tokens.js";
import { del_token } from "../tokens/del_token.js";

//register new user
export async function register(req, res) {
    const { fname, lname, email, password } = req.body;

    //check if user exists - although indexing of db using email works still, may fail at times
    try {
        const exists = await User.findByEmail(email);
        if (!exists) {
           
            const hashedPassword = await bcrypt.hash(password, 5);
            await User.create({ credentials: { fname, lname, email, password: hashedPassword }});

            res.status(201).send('User registered successfully')
        } else{
            res.status(403).send('User with that Email exists')
        };

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
        const user = await User.findByEmail(email)
        if (user) {
            //check password match
            if (await bcrypt.compare(password, user.credentials.password)) {
                //if passed, generate token
                const token_key = await gen_user_token(user.id)

                res.setHeader('authorization', token_key);
                res.status(200).send('Token generated. Logged in') //everything is okay
            } else {
                res.status(401).send('Wrong Password') //user known, but unauthenticated. Invalid password
            }
        }else{

            res.status(401).send('User Does not exist') // invalid email; return 403 to hide the mistaken credential
        }
    } catch (e) {
        console.log(e.message)
        res.status(401).send('promise fail') // invalid email; return 403 to hide the mistaken credential
    }
};

//logout
export async function logout(req, res) {
    
    try {
        //bearer token
        const token_key = req.headers['authorization'].split(' ')[1];

        if (token_key) {
            if (await del_token(token_key)) {
                res.status(200).send('User Logged out')
            }
            else {
                res.status(200).send('Token not found in db. User logged out anyway')
            }
        } else {
            res.status(500).send('No header sent with token')
        }
    } catch (e) {
        res.status(500).send('There was a problem with the promise')
    }
}