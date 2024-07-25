import mongoose from "mongoose";

const BuySchema = new mongoose.Schema({
    productId :{
        type: Number
    },
    product: {
        type : String,
    } ,
    price: {
        type : Number
    },
    image : {
        type  : String
    },
    quantity : {
        type : Number
    },
    address : {
        type : String
    },
    payment : {
        type : Boolean
    }
});

export const Buy = mongoose.model('Buy', BuySchema)