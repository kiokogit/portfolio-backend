import bodyParser from "body-parser";
import router from "../routes/routes.js";
import cors from "cors";

export default function appMiddleware(app) {
    app.use(cors())
    app.use(bodyParser.json({extended:true}));
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/', router);
}