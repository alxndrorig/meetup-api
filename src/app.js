import express from "express";
import "dotenv/config"
import bodyParser from "body-parser";

class App {
    constructor(routes) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initMiddlewares();
        this.initRoutes(routes);
    }

    initMiddlewares() {
        this.app.use(bodyParser.json());
    }

    initRoutes(routes) {
        routes.forEach(route => {
            this.app.use(route);
        })
    }

    listen() {
        this.app.listen(this.port, async () => {
            console.log(`listen on ${this.port}`);
        });
    }
}

export default App