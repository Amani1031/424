
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());


const system = require("./systemFuncs");
const db = require("./WebsiteDB");
const config = require("./config");

const {
    api: { host, port },
} = config;

db.startDatabaseConnection();

app.post("/api/login", system.login);

app.post("/api/register", system.register);

app.post("/api/authenticate", system.authenticateToken, system.fetchUsername);

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