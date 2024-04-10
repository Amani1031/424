
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


const system = require("./systemFuncs");
const db = require("./WebsiteDB");
const config = require("./config");

const {
    api: { host, port },
} = config;

db.startDatabaseConnection();

app.post("/api/login", system.login);

app.post("/api/register", system.register);

app.get("/api/users", system.get_all_users);

app.get("/api/users/:username", system.get_single_user);

process.on("SIGINT", async () => {
    await db.closeDatabaseConnection();
    console.log("MongoDB connection closed");
    process.exit();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  




// MONGODB CONNECTION STRINGS:

// mongodb+srv://websiteAdmin:IGZEprq2QgSK3Zn9@website.rqsjqlu.mongodb.net/?retryWrites=true&w=majority&appName=Website

// mongodb+srv://websiteAdmin:<password>@website.rqsjqlu.mongodb.net/