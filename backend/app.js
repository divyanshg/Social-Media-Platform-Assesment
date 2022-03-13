//load .env.dev if node env in dev
require('dotenv').config()

//Connecting to Database

require("./config/database").connect();


//Initializing the Express App

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan')

//Imorting the routes

const users = require('./routes/route.users');
const welcome = require('./routes/route.welcome');
const post = require('./routes/route.posts')

const app = express();

//Setting up Middlewares

// app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));

//Initializing the Routes

app.use('/api/v1/users', users);
app.use('/api/v1/welcome', welcome);
app.use('/api/v1/post', post);
app.use('/uploads', express.static('uploads'));


//Exporting the app

module.exports = app;
