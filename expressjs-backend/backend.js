
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

app.post("/api/register", (req, res) => {
    const { username, password } = req.body;

    // Check if password has at least one special character
    const hasSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

    if (!hasSpecialCharacter) {
        return res.status(400).json({ error: "Must contain at least one special character" });
    }

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ error: "Username already exists" });
    }

    // Add new user to the users array
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully", user: newUser });
});

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/users/:username", (req, res) => {
    const { username } = req.params;
    const matchedUsers = users.filter(user => user.username === username);
    res.json(matchedUsers);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  