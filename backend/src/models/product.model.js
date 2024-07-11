import mongoose from "mongoose"

const FeedbackSchema = new mongoose.Schema({
    user:{
        type : String
    },
    productId: {
        type : Number,
    } ,
    rating: {
        type : String
    },
    feedback : {
        type  : String
    }
})

export const Feedback = mongoose.model('Feedback', FeedbackSchema)