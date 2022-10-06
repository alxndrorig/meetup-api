import App from "./app.js";
import { meetupRoutes } from "./routes/meetup.routes.js";

const app = new App([meetupRoutes()]);

app.listen();