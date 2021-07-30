// Import packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

// Import .env file
require('dotenv').config({path: './.env'});


// Passport setup
const User = require('./models/User.js');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Cors connection
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

// MongoAtlas Uri
const uri = process.env.ATLAS_URI;

// Session connection
app.set("trust proxy", 1);
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure: true
    },
    store: MongoStore.create({
        mongoUrl: uri
    })
}));

// Passport middleware connection
app.use(cookieParser('secret'))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// MongoDb Atlas connection
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(() => console.log('Connected to MongoAtlas'))
.catch(err => console.log(err))

// Router import
const router = require('./routes.js');
app.use('/', router)

// Server connection

let port = process.env.PORT || 5000
app.listen(port, (err) =>{

    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
    
});

// watch mern2 2:48, splitting the server connection related lines to server and run mongoose connection in index.js