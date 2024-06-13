import { errorHandler } from "../utils/error_handler.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user_model.js';

export const userController = (req,res) => {
    res.send('Hello World!!')
}

export const updateUserController = async (req,res,next) => {
    if(req.user.id != req.params.id) return next(errorHandler(401, "you are not allowed to edit this user"))
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {$set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }}
            , {new : true}  )

            const {password, ...rest} = updatedUser._doc

            res.status(200).json(rest)
    }
    catch(error){
        next(error)
    }
}

export const deleteUserController = async (req,res,next) => {
    if(req.user.id != req.params.id) return next(errorHandler(401, "you are not allowed to delete this user"))
    try{
            
            await User.findByIdAndDelete(req.params.id)
            res.clearCookie('access_token')
            res.status(200).json('User has been deleted')
    }
    catch(error){
        next(error)
    }
}


export default userController
// export default deleteUserController