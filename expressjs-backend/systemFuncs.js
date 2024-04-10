const db = require("./WebsiteDB");

async function login(req, res) {
    const { username, password } = req.body;
    const user = db.getUserAccFromUsernamePwd(username);
    if (user) {
        res.send(true);
    } else {
        res.send(false);
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
        uname = await db.registerNewUserAccount(username, password);
        console.log("Account created successfully");
        res.status(201).json({ message: "User registered successfully", uname });
    } catch(error) {
        console.error("Account creation failed:", error.message);
        return res.status(400).json({ error: "Something went wrong with account creation." });
    }  
}

async function get_all_users(req, res) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
}

async function get_single_user(req, res) {
    const { username } = req.params;
    try {
      const user = await UserModel.findOne({ username });
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
    get_single_user
};