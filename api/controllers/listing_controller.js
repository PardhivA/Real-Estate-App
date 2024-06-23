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
    if(req.user.id !== listing.userRef) return next(errorHandler(401, "you are not allowed to delete this listing"))
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
    if(req.user.id !== listing.userRef) return next(errorHandler(401, "you are not allowed to update this listing"))
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

export const getListingsController = async (req,res,next) => {
    try{
        const limit = parseInt(req.query.limit) || 9
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer

        if(offer=== 'false' || offer === undefined){
            offer = { $in: [false, true]}
        }

        let furnished = req.query.furnished

        if(furnished=== 'false' || furnished === undefined){
            furnished = { $in: [false, true]} 
        }

        let parking = req.query.parking

        if(parking=== 'false' || parking === undefined){
            parking = { $in: [false, true]} 
        }

        let type = req.query.type

        if(type=== 'all' || type === undefined){
            type = { $in: ['sale', 'rent']} 
        }

        const searchTerm = req.query.searchTerm || ''

        const sort = req.query.sort || 'createdAt'

        const order = req.query.order || 'desc'

        const listings = await Listing.find(
            {
                name : {$regex: searchTerm, $options: 'i'},
                offer,
                furnished,
                parking,
                type,
            }
        ).sort({
            [sort] : order
        }).limit(limit).skip(startIndex)


        res.status(200).json(listings)
    }
    catch(error){
        next(error)
    }
}