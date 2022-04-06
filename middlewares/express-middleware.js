import { json } from "body-parser";
import cookieParser from "cookie-parser";
import router from "../routes/routes";

export default function appMiddleware(app) {
    app.use(json);
    app.use(cookieParser);
    app.use('/', router);
}