import User from "../models/user_model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error_handler.js";
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
                next(errorHandler(550, 'Internal Server error from function'));
        
    }
}