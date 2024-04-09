const mongoose = require("mongoose");

const UserAccountSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: false,
    },
  },
  { collection: "UserAccount" }
);

module.exports = UserAccountSchema;