import User from "../models/user_model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error_handler.js";
import jwt from 'jsonwebtoken'
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
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET)
        const {password: pass, ...rest } = validUser._doc; // to remove password before sending it to user
        res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest)    
    }
    catch(err){
        next(err)
    }
}