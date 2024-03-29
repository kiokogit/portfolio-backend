import bodyParser from "body-parser";
import router from "../routes/routes.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

export default function appMiddleware(app) {
    app.use(cors({exposedHeaders: 'authorization'}))
    app.use(bodyParser.json({extended:true, limit:'30mb'}));
    app.use(bodyParser.urlencoded({extended:true, limit:'30mb'}))
    app.use(cookieParser())
    app.use('/', router)
}