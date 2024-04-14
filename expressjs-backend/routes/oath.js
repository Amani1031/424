

const sysFuncs = require("../systemFuncs");

var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");

const fetch = require("node-fetch");


dotenv.config();

const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {

  const response = await fetch(

    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`

  );

  const data = await response.json();

  console.log("data", data);

}

router.get("/", async function (req, res, next) {

  const code = req.query.code;

  try {

    const redirectUrl = "http://127.0.0.1:8000/oath";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
     redirectUrl
    );

    const result = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(result.tokens);
    const user = oAuth2Client.credentials;
    // show data that is returned from the Google call
    console.log('credentials', user);
    await getUserData(oAuth2Client.credentials.access_token);

        
   // call your code to generate a new JWT from your backend, don't reuse Googles

    const token = sysFuncs.generateAccessToken(user.appUser.userid);
    res.redirect(303, `http://localhost:3000/token=${token}`);

    } catch (err) {
           console.log("Error with signin with Google", err);
           res.redirect(303, "http://localhost:3000/");

  }

});
module.exports = router;