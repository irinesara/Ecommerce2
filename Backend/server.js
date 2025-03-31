const express = require('express');
const connectDB = require("./src/Database/db");
const app = express();

require('dotenv').config({
    path: './src/Config/.env'
});
const port = process.env.PORT || 8080;
const url = process.env.db_url;

app.listen(port, async() => {

  try{
    await connectDB(url);
    console.log(`Server is running on port ${port}`);
  }
  catch(error){
    console.error(error);
  }
});

app.get('/', (req, res) => {    
    res.send('Hello World!');
});