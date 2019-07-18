require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes');
const port = 3000;
const cors = require('cors');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());
app.use('/', routes);

app.use(function(err,req,res,next){
  if(err.code === 404) {
    res.status(404).json({ message: 'Resource not found' })
  } else if(err.name === 'ValidationError') {
    res.status(500).json({ message: err.message })
  } else {
    const status = err.status || 500
    const message = err.message
    res.status(status).json({ message: message })
  }
});

app.listen(port, () => console.log(`listening on port`, port))
//install axios, bcrypt, cors, dotenv, express, jwt, mongoose