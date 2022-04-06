import express from 'express';
import { env } from 'process';
import db_connected from '../db/db_connection';
import appMiddleware from '../middlewares/express-middleware';

const app = express();

// middlewares for all routes, including app.router, cookies, json conversion, 
appMiddleware(app);

// run connection to db. Returns true if connection successful;
db_connected();

// write to retry connection after a timeout if returned false. 
/* 
for(let i=0; i<=3; i++){
    if (db_connected()){
    break
    } else{
    setTimeout(()=>{
    db_connected()
    }, 2000);
    }
};
*/

// express server connection
const PORT = env.PORT;
// later, write to retry connection if error found
app.listen(PORT, (err) => 
    err? console.log('Conection to server failed... Retry!'): console.log(`Server is listening on port: ${PORT}`)
);