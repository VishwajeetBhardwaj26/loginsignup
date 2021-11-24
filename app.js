const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyparser = require('body-parser');

const app = express();
app.use(express.json());


const hbs = require("hbs");
const path = require("path");
require('./config/passport')(passport);
const db = require('./config/keys').mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));

const style = path.join(__dirname,"../Noobsy/public");
app.set("view engine", ".hbs");
app.use(express.static(style));
app.use(express.json());


// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use("/users",require("./routes/users.js"));
app.use("/",require("./routes/users.js"));
const PortNo = 8000;
app.listen(PortNo, (req,res)=>{
   console.log(`listening on port no ${PortNo}`);
});