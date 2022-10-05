import express from "express";
import "dotenv/config"

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000
    }

    listen() {
        this.app.listen(this.port, async () => {
            console.log(`listen on ${this.port}`);
        });
    }
}

export default App