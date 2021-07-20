const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: './.env'});

const app = express();




// MongoDb Atlas connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('Connected to MongoAtlas'))
    .catch(err => console.log(err))



// Server connection
app.listen(process.env.PORT, (err) =>{

    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
    
});