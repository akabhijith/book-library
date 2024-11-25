// import "dotenv/config";
// import fs from "fs";
// import { dirname } from "path";
// import { fileURLToPath } from "url";


const express = require("express");
const axios=require('axios')
const pg=require('pg')
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");
const dirname = path.dirname;
const fileURLToPath = (url) => {
  return require("url").fileURLToPath(url);
};
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const PORT = 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret", // Use a strong secret in production
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


const bookRoutes = require("./routes/bookRoutes");


app.use("/", bookRoutes);



app.use("/api", bookRoutes);
app.use(express.static("public"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("error", {
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT,()=>{
    console.log('Server is listening at http://localhost:${PORT} ');
    
})