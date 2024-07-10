import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    id :{
        type: Number
    },
    title: {
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