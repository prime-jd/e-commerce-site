import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({

    product: {
        type : String,
    } ,
    price: {
        type : Number
    },
    image : {
        type  : String
    }
});

export const Cart = mongoose.model('Cart', CartSchema)