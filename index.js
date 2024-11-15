import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import "dotenv/config";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render('index');
})

const bookRoutes = require("./routes/bookRoutes");

app.use("/api", bookRoutes);

app.listen(PORT,()=>{
    console.log('Server is listening at http://localhost:${PORT} ');
    
})