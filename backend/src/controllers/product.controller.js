import asyncHandler from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";



const Productdetails = asyncHandler( async (req, res)=>{
    const product = await Product.find();
    if(!product) throw new ApiError(404, "Products not found");
    return res.json(new ApiResponse(200, "All products", product))
})

const addToCart = asyncHandler( async(req,res)=>{
    console.log(req.body)
    const {id,product,price,image} = req.body;
    
    const cart = await Cart.create({
        id,
        product,
        price,
        image
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
  

export {
    Productdetails,
    addToCart,
    displayCart,
    removeFromCart
}