import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    product: {
        type : String,
    } ,
    price: {
        type : Number
    },
    image : {
        type  : String
    }
})

export const Product = mongoose.model('Product', ProductSchema)