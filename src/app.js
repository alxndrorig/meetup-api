import express from "express";

class App {
    constructor() {
        this.app = express();
    }

    listen() {
        this.app.listen(3000, () => {
            console.log('Listen port 3000');
        });
    }
}

export default App