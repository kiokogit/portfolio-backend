import { User } from "../models/user_model.js";
import bcrypt from 'bcryptjs'
import { gen_user_token } from "../tokens/gen_tokens.js";
import { del_token } from "../tokens/del_token.js";

//register new user
export async function register(req, res) {
    const { username, fname, lname, email, password } = req.body;

    //check if user exists - although indexing of db using email works still, may fail at times
    try {
        const email_exists = await User.findOne({email:email});
        const username_exists = await User.findOne({username:username});
        // const email_exists = await User.findByUsernameOrEmail('email',email)
        // const username_exists = await User.findByUsernameOrEmail('username',username)
        if (!email_exists && !username_exists) {
           
            const hashedPassword = await bcrypt.hash(password, 5);
            await User.create({ username, fname, lname, email, password: hashedPassword });
            
            //return successful
            res.status(200).send("User registered Successfuly")

        } else if(email_exists){
            res.status(403).send('User with that Email/Username Exists')
        } else {
            res.status(403).send('User with that Username/Email Exists.')
        };

    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)   
    }
};

//login
export async function login(req, res) {

    const { email, username, password } = req.body;
    
    try {
        if(!password || (!username && !email)) {
            //BAD REQUEST
            res.status(400).send("Invalid/missing arguments")
        } else {

        //check if user available
        let user;
        const user1 = await User.findOne({ email: email })
        const user2 = await User.findOne({ username: username })
        if (user1) user = user1;
        if(user2) user=user2;
        if (user) {
            //check password match
            if (await bcrypt.compare(password, user.password)) {
                //if passed, generate token
                const token_key = await gen_user_token(user.id)
                if(token_key===0 || !token_key || token_key==='undefined'){
                    console.log(`Token ${token_key} not useful...`)
                    res.status(403).send('System Error. User cannot be logged in')
                }else{
                    //send token as header
                    res.setHeader('authorization', token_key)
                    res.status(200).send('User logged in Successfully') //everything is okay
                }

            } else {
                res.status(401).send('Invalid Email/Username/Password') //user known, but unauthenticated. Invalid password
            }
        }else{

            res.status(401).send('Invalid Email/Username/Password') // invalid email; return 403 to hide the mistaken credential
        }
    }
        
    } catch (e) {
        console.log(e.message)
        res.status(401).send('System Error') // invalid email; return 403 to hide the mistaken credential
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