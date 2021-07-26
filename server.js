const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const User = require('./models/User.js');

require('dotenv').config({path: './.env'});


// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.ATLAS_URI
    })
}))

app.use(cookieParser('secret'))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// MongoDb Atlas connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(() => console.log('Connected to MongoAtlas'))
.catch(err => console.log(err))

// Import router
const router = require('./routes.js');
app.use('/', router)

// Server connection
app.listen(process.env.PORT, (err) =>{

    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
    
});

// watch mern2 2:48, splitting the server connection related lines to server and run mongoose connection in index.js