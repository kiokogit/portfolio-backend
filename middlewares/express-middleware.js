import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "../routes/routes.js";

export default function appMiddleware(app) {
    app.use(bodyParser.json());
    app.use(cookieParser);
    app.use('/', router);
}