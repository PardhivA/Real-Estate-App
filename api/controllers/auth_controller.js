import User from "../models/user_model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error_handler.js";
import jwt from 'jsonwebtoken'

const options = {
    expiresIn: '15d' // Set the token to expire in 15 days
  };
  

export const signup = async (req,res, next) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{

        await newUser.save()
        res.status(201).json('New User Created')
    }
    catch(error){
        // errorHandler(550, 'Internal Server error from function')
                next(error);
        
    }
}


export const signin = async (req, res, next) =>{
    const {email, password} = req.body
    try{
        const validUser = await User.findOne({email : email})
        if(!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials'))
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET,options)
        const {password: pass, ...rest } = validUser._doc; // to remove password before sending it to user
        res
        .cookie('access_token', token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true })
        .status(200)
        .json(rest)    
    }
    catch(err){
        next(err)
    }
}

export const google = async(req,res,next) =>{
    const {email}= req.body
    try{
        const validUser = await User.findOne({email : email})
        if(!validUser){
            const generatedPassword = Math.random.toString(36).slice(-8) + Math.random.toString(36).slice(-8) 
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); 
            const new_user = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random.toString(36).slice(-4),
                email: req.body.email   ,
                password: hashedPassword,
                avatar: req.body.photoURL
            }) 
            await new_user.save();
        const token = jwt.sign({ id: new_user._id}, process.env.JWT_SECRET,options)
        const {password: pass, ...rest } = new_user._doc; // to remove password before sending it to user
        res
        .cookie('access_token', token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true })
        .status(200)
        .json(rest)     
        }
        else {  
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET,options)
        const {password: pass, ...rest } = validUser._doc; // to remove password before sending it to user
        res
        .cookie('access_token', token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true })
        .status(200)
        .json(rest)    
        }
    }
    catch(err){
        next(err)
    }
}

export const signout = async (req,res,next) => {
    try{
        res.clearCookie('access_token')
        res.status(200).json('Logged out successfully')
    }
    catch(error){
        next(error)
    }
}