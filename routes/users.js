const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const { forwardAuthenticated } = require('../config/auth');
router.get("",(req,res)=>{
  res.render("home");

});
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

router.post('/signup', async (req, res) => {
  const {name, email,contact, password, confpassword} = req.body;
  console.log(req.body) 
  if (!name || !email || !contact || !password || !confpassword){
      return res.status(422).json({error: "Kindly Fill Every Field"});
  }
  console.log(req.body)
  try{
      const userEXIST = await User.findOne({ email:email});
      console.log(userEXIST)
      if (userEXIST){
          return res.status(422).json({error: "User already exists"});
      }
      else if(password != confpassword){
          return res.status(422).json({error:"Reconfirm Your Password"});
      }else{
          const hashedPassword = await bcrypt.hash(password, 12);
          const latestUser = new User({ name, email,contact, password:hashedPassword, confpassword });
          latestUser
          .save()
          .then(() => {
           res.send("registered account!");
            return;
      })
    }      
     }catch (err) {
         console.log(err);
  }
});
router.post('/login', async (req, res) =>{
    console.log("login req : ");
  try{
      const { email, password} = req.body;
      console.log(email, password);
      if (!email||!password){
          return res.status(400).json({error:"Kindly Fill Every Data"});
      }
      const userLogin =await User.findOne({email:email});
      if(userLogin){
        if(password != userLogin.password) {
                res.status(400).json({error: "Invalid Credential"});
      }else{
          res.json({ message: "Login successful"});
      }
      }else {
          res.status(400).json({error: "Invalid Credential"});
      }
      
  }catch(err){
       console.log(err);

  }

});






module.exports=router;
 