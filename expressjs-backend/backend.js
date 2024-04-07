
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const config = {
    api: {
        host: "http://localhost:8000",
        port: 8000,
        name: "WebsiteAPI",
      },
};

const { host, port } = config.api;

// Temporary user data
const users = [
    { id: 1, username: 'bj', password: 'pass424' }
];

app.get('/', (req, res) => {
    res.send('Wooh');
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send(true);
    } else {
        res.send(false);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  