const db = require("./WebsiteDB");
const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");

dotenv.config()

async function login(req, res) {
  const { username, password } = req.body;
  const user = await db.getUserAccFromUsernamePwd(username, password);
  if (user) {
      const token = generateAccessToken({ username: username });
      return res.json({token, username: username});
  } else {
      return res.send(false);
  }
}

async function register(req, res) {
    const { username, password } = req.body;

    // Check if password has at least one special character
    const hasSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

    if (!hasSpecialCharacter) {
        return res.status(400).json({ error: "Must contain at least one special character" });
    }

    try {
        const uname = await db.registerNewUserAccount(username, password);
        console.log("Account created successfully");
        const token = generateAccessToken({ username: uname });
        return res.status(201).json({ message: "User registered successfully", token, username: uname });
    } catch(error) {
        console.error("Account creation failed:", error.message);
        return res.status(400).json({ error: "Something went wrong with account creation." });
    }  
}

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
  const token = authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("JWT Verify did not work.");
      console.log(err);
      return res.sendStatus(401);
    }

    req.user = user;
    next();
  });
}

async function fetchUsername(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.decode(token);

  if (decoded) {
    const { username } = decoded;
    const user = await db.findSingleUser(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log('Username:', user.username);
    return res.status(201).json({username: user.username});
  } else {
    console.log('Failed to decode token.');
    return res.status(404).json({ error: "User not found" });
  }
};

async function get_all_users(req, res) {
    try {
      users = await db.displayAllUsers();
      console.log("Displaying users now.");
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
}

async function get_single_user(req, res) {
    const { username } = req.params;
    try {
      const user = await db.findSingleUser(username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    login,
    register,
    get_all_users,
    get_single_user,
    authenticateToken,
    fetchUsername,
};