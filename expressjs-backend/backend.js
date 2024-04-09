
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const logReg = require("./login-register");

const {
    api: { host, port },
} = config;

app.post("/api/login", logReg.login);

app.post("/api/register", logReg.register);

app.get("/api/users", logReg.get_all_users);

app.get("/api/users/:username", logReg.get_single_user);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  




// MONGODB CONNECTION STRINGS:

// mongodb+srv://websiteAdmin:IGZEprq2QgSK3Zn9@website.rqsjqlu.mongodb.net/?retryWrites=true&w=majority&appName=Website

// mongodb+srv://websiteAdmin:<password>@website.rqsjqlu.mongodb.net/