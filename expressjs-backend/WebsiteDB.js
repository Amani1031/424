const mongoose = require("mongoose");

const UserAccountSchema = require("./UserAccountSchema");

const config = require("./config");

const {
  database: { host, name, username, password },
} = config;

const DATABASE_NAME = name;
const DATABASE_URL = `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority&appName=${DATABASE_NAME}`;

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

async function getUserAccFromUsernamePwd(
    username,
    password
  ) {
    const conn = getDatabaseConnection();
    const UserAccountModel = conn.model("UserAccount", UserAccountSchema);
    if (!username) {
      throw new Error("Username needed");
    }
    let acc = await UserAccountModel.findOne({
      username: username,
      password: password
    });
    return acc;
}

module.exports = {
    startDatabaseConnection,
    setDatabaseConnection,
    getDatabaseConnection,
    closeDatabaseConnection,
    registerNewUserAccount,
    getUserAccFromUsernamePwd,
  };