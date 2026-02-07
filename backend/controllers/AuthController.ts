import User from '../models/user.js'
import { Request,Response } from 'express'
import bcrypt from "bcrypt"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Controller for User Sign up 

export const registerUser = async (req:Request,res:Response) =>{
   try {
     const {name,email,password} = req.body;
 // all field are available or not 
  if(!name || !email || !password ){
     return res.status(400).json({
          message:"All fieds are required",
     }) 
  }

  //Check email format
  if(!emailRegex.test(email)){
     return res.status(400).json({
          message:"Invalid email format"
     })

  }
  //check passord format
  if (!passwordRegex.test(password)) {
  return res.status(400).json({
    success: false,
    message:
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
  });
}
  //  find user by email
  const user = await User.findOne({email});
  if(user){
     return res.status(409).json({
          message:"User already registered"
     })
  }
  const hashedPassword = await bcrypt.hash(password,10);

  const newUser = new User({name:name,email:email,password:hashedPassword});
  await newUser.save();

  //setting user data in session
  req.session.isLoggedIn = true;
  req.session.userId = newUser._id.toString();


  return res.status(201).json({
   message:"Account Successfully created",
   user:{
      _id:newUser._id,
      name:newUser.name,
      email:newUser.email
   }
  })

     
   } catch (error:any) {
      console.log("Error while creating account",error);
      res.status(500).json({
         message:error.message
      })


     
   }
}

// Controller for User Login

export const loginUser = async (req:Request,res:Response) =>{
   try {
      const {email,password} = req.body;

      //  1. All fields are available or not
          if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
          }



      
   } catch (error:any) {
      
   }
}
