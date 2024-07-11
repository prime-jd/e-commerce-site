import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
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
    }
});

export const Cart = mongoose.model('Cart', CartSchema)