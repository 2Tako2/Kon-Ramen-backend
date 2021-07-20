const express = require('express');
require('dotenv').config({path: './.env'});


const app = express();

app.listen(process.env.PORT, (err) =>{

    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
    
});