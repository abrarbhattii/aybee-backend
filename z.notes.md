<!-- npm init (got package.json ) -->
<!-- added readme.md -->
<!-- added public/temp/.gitkeep -->
<!-- added .gitignore(content of file from .gitignore generator  for node) -->
<!-- added .env & (.env.sample for push) -->

<!-- added src -->
<!-- added app.js, constants.js,index.js inside src -->
<!-- added directories via mkdir controllers, db, middlewares, models, routes, utils inside src -->

<!-- installed nodemon dev dependency (npm i -D nodemon) for index.js autoreload on save -->
<!-- installed prettier dev dependency (npm i -D prettier) -->
<!-- added .prettierrc & .prettierignore also added content in these files -->

<!-- package.json -->
<!-- added script ("dev": "nodemon src/index.js") -->
<!-- made it modular ("type": "module") -->

<!-- mogodb atlas > account > cluster > user > network acces > connection string -->

<!-- .env file > add PORT > add mongoDb_url -->

<!-- constants.js file in src > add (export const DB_NAME = "videotube";) -->

<!-- npm i mongoose express dotenv -->

<!-- notes for database connection-->
<!-- 1. wrap in try catch or promise -->
<!-- 2. Database is always in another continent -->


<!-- make a connection in src/ index.js -->
<!-- or -->
<!-- make a connction in src/db/index.js and export it but use dotenv -->
<!-- for that npm i dotenv & goto package.json  -->
<!-- and add (-r dotenv/config --experimental-json-modules) in dev script like --> 
<!-- to load directly("dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"") -->

<!-- goto src/app.js-->
<!-- write express app and export it -->
<!-- goto src/index.js-->
<!-- connectDB ehich returns promise  -->
<!-- make a .then & .catch chain & in .then make express app listen and catch app error via app.on -->

<!-- use app.use when middleware or configuration is required -->

<!-- npm i cookie-parser cors -->
<!-- import them in app.js & make configuration -->

<!-- make an asyncHandler wrapper/helper/utility method for connectDB to avoid repetition -->
<!-- make an ApiError class utility for customized errors -->
<!-- make an Apiresponse class utility for response -->

<!--  Middleware in Express  -->
<!-- it is a function that gets executed between  -->
<!-- the request coming in (from the client)  -->
<!-- and the response going out (from the server). -->

<!-- Informational responses (100 – 199) -->
<!-- Successful responses (200 – 299) -->
<!-- Redirection messages (300 – 399) -->
<!-- Client error responses (400 – 499) -->
<!-- Server error responses (500 – 599) -->

<!-- create user.model & video.model -->

<!-- BSON, which stands for Binary JSON, is a binary-encoded serialization of JSON-like documents -->
<!-- Unlike JSON, which is text-based, BSON uses a binary format, making it more space-efficient and faster to parse. -->

<!-- BSON includes data types not found in JSON, such as:  -->
<!-- Dates: For storing date and time information.  -->
<!-- Binary Data: For storing arbitrary binary data, like images or files.  -->
<!-- Other Data Types: BSON also includes support for integers (64-bit and 32-bit), doubles, and more.  -->

<!-- make an index: true to make a field searchable in any database speciallly mongoDB -->

<!-- *system design *database design -->

<!-- npm install mongoose-aggregate-paginate-v2 -->
<!-- use plugin hook -->
<!-- and inject as plugin in sche,e for aggregation queries -->

<!-- install bcrypt for password hashing -->
<!-- install jwt (based on cryptography) for making tokens -->

<!-- use pre hook in saving data -->
<!-- write methods for tokens -->

<!-- jwt is a bearer token -->
<!-- who bears this token, is right -->
<!-- who have this token , will get data -->

<!-- In terminal, type & enter node -->
<!-- Then inside the Node REPL paste the following line of code -->
<!-- require('crypto').randomBytes(64).toString('hex'); -->
<!-- Press Enter, and it will generate your secret key. -->

<!-- jwt.sign(payload, secretOrPrivateKey, [options, callback]) -->
<!-- jwt.sign() is a method, & is used to create (sign) a JWT (JSON Web Token). -->

<!-- payload: What you want to encode in the token (e.g. { _id: user._id }) -->
<!-- secretOrPrivateKey: Your secret key to sign the token (e.g. from .env) -->
<!-- options (optional): e.g. expiresIn, issuer, etc. -->
<!-- callback (optional): If omitted, returns the token directly (synchronously). -->



<!--  1. Password Hashing Without bcrypt Using Node.js crypto module -->
const crypto = require('crypto');

// Hash password (with salt)
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt, hash };
}

// Compare password
function verifyPassword(password, hash, salt) {
    const newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return newHash === hash;
}

const { salt, hash } = hashPassword('myPassword123');
const isMatch = verifyPassword('myPassword123', hash, salt);


<!-- 2. Token Generation Without jsonwebtoken -->
<!-- JWTs are just base64-encoded JSON objects with a signature. -->
<!-- You can manually make a simple token (not full JWT spec) using crypto. --> 
const crypto = require('crypto');

// Generate a simple signed token
function generateToken(payload, secret) {
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString('base64url');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto
        .createHmac('sha256', secret)
        .update(`${header}.${body}`)
        .digest('base64url');

    return `${header}.${body}.${signature}`;
}

// Verify token
function verifyToken(token, secret) {
    const [header, body, signature] = token.split('.');
    const expectedSig = crypto
        .createHmac('sha256', secret)
        .update(`${header}.${body}`)
        .digest('base64url');

    if (signature !== expectedSig) return null;
    return JSON.parse(Buffer.from(body, 'base64url').toString());
}

const secret = 'mySuperSecretKey';
const token = generateToken({ _id: "123", role: "admin" }, secret);
const decoded = verifyToken(token, secret);  // gives the payload if signature is valid

<!-- in order to chnage remote origin in local project if anything is changed at remote, run this command -->
<!-- git remote set-url origin https://github.com/NEW_USERNAME/REPO_NAME.git -->

<!-- $ git remote add origin https://github.com/OWNER/REPOSITORY.git -->
<!-- # Set a new remote -->

<!-- $ git remote -v -->
<!-- # Verify new remote -->
<!-- > origin  https://github.com/OWNER/REPOSITORY.git (fetch) -->
<!-- > origin  https://github.com/OWNER/REPOSITORY.git (push) -->

<!-- fileupload -->
<!-- npm i cloudinary multer -->

<!-- add util cloudinary.js -->
<!-- in which impoert v2 as clodinary & fs from nodejs -->
<!-- set env variables for api key, api secret cloudname -->
<!-- cofigure cloudinary upload local file-->

<!-- write multer middleware -->
<!-- import & store in diskstorage -->
<!-- read multer github redme docs -->
<!-- multer is used in Node.js + Express apps to handle file uploads, -->
<!-- especially when form data includes files like imgs, PDFs, vids, docs. -->
<!-- it stores files locally in disk or memory storage -->

<!-- How to Handle File Uploads Without Multer -->
<!-- We’ll do this using: -->
<!-- Core Node.js modules: http, fs, and path -->
<!-- No Express (or minimal use) -->
<!-- No external libraries -->
<!-- 1. Create a Simple HTTP Server That Accepts File Upload -->

const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const boundary = req.headers['content-type'].split('boundary=')[1];
    let rawData = Buffer.alloc(0);

    req.on('data', chunk => {
      rawData = Buffer.concat([rawData, chunk]);
    });

    req.on('end', () => {
      const parts = rawData.toString().split(`--${boundary}`);
      const filePart = parts.find(part => part.includes('filename='));
      
      if (!filePart) {
        res.writeHead(400);
        return res.end('No file uploaded');
      }

      const match = filePart.match(/filename="(.+?)"/);
      const filename = match ? match[1] : 'uploaded_file';

      const fileDataStart = filePart.indexOf('\r\n\r\n') + 4;
      const fileDataEnd = filePart.lastIndexOf('\r\n');
      const fileData = filePart.slice(fileDataStart, fileDataEnd);

      fs.writeFileSync(path.join(__dirname, filename), fileData, 'binary');

      res.writeHead(200);
      res.end('File uploaded successfully!');
    });
  } else {
    // Simple HTML form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <form method="POST" action="/upload" enctype="multipart/form-data">
        <input type="file" name="file"><br>
        <button type="submit">Upload</button>
      </form>
    `);
  }
}).listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
