TO CONFIGURE BETWEEN HTTP AND HTTPS:

Within the backend:
- Change all mentions of http to https in config.js, oath.js, and request.js
- Within backend.js, uncomment the https listening function and comment the http app.listening function

Within the frontend:
- Change all mentions of http to https in config.js
- Within package.json: change the portion after the colon for "scripts": to "HTTPS=true SSL_CRT_FILE=./reactcert/cert.pem SSL_KEY_FILE=./reactcert/key.pem react-scripts start"

ADDED FEATURES FROM PART 2:
- JWT Token support to stay logged in
- Contacts landing page
- MongoDB databae support

One one terminal: cd react-frontend, npm start

On the second terminal: cd express-backendjs, node backend.js
