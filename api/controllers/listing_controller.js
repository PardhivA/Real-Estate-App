import Listing from "../models/listing_model.js "
import { errorHandler } from "../utils/error_handler.js"


export const createListing = async (req,res,next) => {
        try{
            const listing = await Listing.create(req.body)
            return res.status(201).json(listing)
        }
        catch(error){
            next(error)
        }
}

export const deleteListingController = async (req,res,next) => {
    const listing=  await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404, "Listing not found"))
    }
    if(req.user.id != listing.userRef.toString()) return next(errorHandler(401, "you are not allowed to delete this listing"))
    try{
            
            await Listing.findByIdAndDelete(req.params.id)
            res.status(200).json('Listing has been deleted')
    }
    catch(error){
        next(error)
    }
}

export const updateListingController = async (req,res,next) => {
    const listing=  await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404, "Listing not found"))
    }
    if(req.user.id != listing.userRef.toString()) return next(errorHandler(401, "you are not allowed to update this listing"))
    try{
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, 
           req.body
            , {new : true}  )
            // const {password, ...rest} = updatedUser._doc

            res.status(200).json(updatedListing)
    }
    catch(error){
        next(error)
    }
}


export const getListingController = async (req,res,next) => {
    try{
        const listing = await Listing.findById(req.params.id)
        if(!listing) return next(errorHandler(404, 'Listing not found'))
        res.status(200).json(listing)
    }
    catch(error){
        next(error)
    }
}