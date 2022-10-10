import express from "express";
import "dotenv/config"
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import swaggerDocument  from "./swagger/swagger.document.json" assert { type: 'json' };

class App {
    constructor(routes) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initMiddlewares();
        this.initRoutes(routes);
        this.specs
    }

    initMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
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