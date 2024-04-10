const mongoose = require("mongoose");

const UserAccountSchema = require("./UserAccountSchema");

const dotenv = require("dotenv");

dotenv.config()

const DATABASE_NAME = process.env.NAME;
const DATABASE_URL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/?retryWrites=true&w=majority&appName=${DATABASE_NAME}`;

let dbConnection = null;

function startDatabaseConnection() {
    mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected");
        setDatabaseConnection(mongoose.connection);
    }).catch((error) => {
        console.error("MongoDB connection failed:", error);
    });
}

function setDatabaseConnection(connection) {
    dbConnection = connection;
}

function getDatabaseConnection() {
  return dbConnection;
}

function closeDatabaseConnection() {
    mongoose.disconnect().then(() => {
        console.log("MongoDB disconnected");
    }).catch((error) => {
        console.error("Error disconnecting MongoDB:", error);
    });
}

async function registerNewUserAccount(
    username,
    password
  ) {
    const conn = getDatabaseConnection();
    if (!conn) {
        throw new Error("Database connection is not established");
    }
    const UserAccountModel = conn.model("UserAccount", UserAccountSchema);
    let account = new UserAccountModel({
      username: username,
      password: password,
    });
    try {
      await account.save();
      return account.username;
    } catch (err) {
      const error_message_field = err.message.split("{")[1].split(" ")[1];
      const error_message = `${
        error_message_field === "username:" ? "Username" : "Email ID"
      } already exists!`;
      throw new Error(error_message);
    }
}

async function displayAllUsers() {
    const conn = getDatabaseConnection();
    if (!conn) {
        throw new Error("Database connection is not established");
    }
    try {
        const UserAccountModel = conn.model("UserAccount", UserAccountSchema);
        const users = await UserAccountModel.find();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
}

async function getUserAccFromUsernamePwd(
    username,
    password
  ) {
    const conn = getDatabaseConnection();
    if (!conn) {
        throw new Error("Database connection is not established");
    }
    const UserAccountModel = conn.model("UserAccount", UserAccountSchema);
    let acc = await UserAccountModel.findOne({
      username: username,
      password: password
    });
    return !!acc;
}

async function displaySingleUser(username) {
    const conn = getDatabaseConnection();
    if (!conn) {
        throw new Error("Database connection is not established");
    }
    const UserAccountModel = conn.model("UserAccount", UserAccountSchema);
    let acc = await UserAccountModel.findOne({
      username: username
    });
    return acc;
}

module.exports = {
    startDatabaseConnection,
    setDatabaseConnection,
    getDatabaseConnection,
    closeDatabaseConnection,
    registerNewUserAccount,
    displayAllUsers,
    getUserAccFromUsernamePwd,
    displaySingleUser
  };