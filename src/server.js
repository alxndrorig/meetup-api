import App from './app.js';
import { meetupRoutes } from './routes/meetup.routes.js';
import { authentificationRouter } from './routes/authentification.routes.js';

const app = new App([meetupRoutes(), authentificationRouter()]);

app.listen();
