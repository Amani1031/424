
const express = require('express');
const cors = require('cors');
const https = require("https");
const fs = require("fs");
const app = express();
const cookieParser = require('cookie-parser');

const authRouter = require("./routes/oath");
const requestRouter = require("./routes/request");


app.use(express.json());
app.use(cors());
app.use(cookieParser());


const system = require("./systemFuncs");
const db = require("./WebsiteDB");
const config = require("./config");

const {
    api: { host, port },
} = config;

// https
//   .createServer(
//     {
//         key: fs.readFileSync("key.pem"),
//         cert: fs.readFileSync("cert.pem"),
//     }, app)
//   .listen(port, ()=>{
//     console.log('server is runing at port 8000')
//   });

db.startDatabaseConnection();

app.post("/api/login", system.login);

app.get('/', (req,res)=>{
    res.send("Hello from express server.")
})

app.post("/api/register", system.register);

app.post("/api/authenticate", system.authenticateToken, system.fetchUsername);

app.get("/api/users", system.get_all_users);

app.post("/api/contacts", system.getContacts);

app.get("/api/users/:username", system.get_single_user);

app.use("/oath", authRouter);

app.use("/request", requestRouter);

process.on("SIGINT", async () => {
    await db.closeDatabaseConnection();
    console.log("MongoDB connection closed");
    process.exit();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  