import asyncHandler from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Feedback } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";





const addToCart = asyncHandler( async(req,res)=>{
    console.log(req.body)
    const {productId,title,price,image,quantity} = req.body;
    
    const cart = await Cart.create({
        productId,
        product: title ,
        price,
        image,
        quantity
    })
    return res.json(new ApiResponse(200, "Product added to cart", cart))
})

const displayCart = asyncHandler(async(req, res)=>{
    const cart = await Cart.find();
    if(!cart) throw new ApiError(404, "Cart not found");
    return res.json(new ApiResponse(200, "All products in cart", cart))
})

const removeFromCart = asyncHandler(async (req, res) => {
    const { product } = req.body;
    if (!product) throw new ApiError(400, 'Product details not provided');
    await Cart.deleteOne({ product });
    const cartItems = await Cart.find();
    if (cartItems.length === 0) {
      return res.json(new ApiResponse(200, 'All products removed from cart', []));
    }
    return res.json(new ApiResponse(200, 'Product removed from cart', cartItems));
  });


  const giveFeedback = asyncHandler(async (req,res)=>{
    const {productId,feedback,user,rating} = req.body;
    const product = await Feedback.create({
        productId,
        feedback,
        user,
        rating
    })
    return res.json(new ApiResponse(200, "Feedback given", product))
  })

  const displayFeedback = asyncHandler(async(req,res)=>{
    const {productId}= req.body;
    const feedback = await Feedback.find({productId});
    if(!feedback) throw new ApiError(404, "Feedback not found");
    return res.json(new ApiResponse(200, "All feedbacks", feedback))
  })
  

export {

    addToCart,
    displayCart,
    removeFromCart,
    giveFeedback,
    displayFeedback
}