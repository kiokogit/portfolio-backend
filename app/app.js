import express from 'express';
import db_connected from '../db/db_connection.js';
import appMiddleware from '../middlewares/express-middleware.js';
import 'dotenv/config';

const app = express();

// middlewares for all routes cookies, json conversion, 
appMiddleware(app);

// run connection to db. Returns true if connection successful;
db_connected();

// express server connection
const PORT = process.env.PORT;
// later, write to retry connection if error found
app.listen(PORT, (err) => 
    err? console.log('Conection to server failed... Retry!'): console.log(`Server is listening on port: ${PORT}`)
);