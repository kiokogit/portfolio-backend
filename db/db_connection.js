import mongoose from 'mongoose';
import 'dotenv/config';

const DB_URL = process.env.DB_URL;

export default function db_connected () {
    mongoose.connect(DB_URL, { useUnifiedTopology:true, autoIndex:false, autoCreate:false}, (err) => {
        if (err) {
            console.log('Connection to database failed')
            return true
        }
        else {
            console.log('Connected to database successfully...');
            return false
        }
    });
};
