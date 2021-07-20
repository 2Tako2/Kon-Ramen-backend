const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({path: './.env'});

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(bodyParser.json());

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