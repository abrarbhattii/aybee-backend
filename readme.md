# aybee & backend

This is a backend project
- [model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

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