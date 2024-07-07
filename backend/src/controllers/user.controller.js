import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from '../utils/AsyncHandler.js'




const generateAccessAndRefreshToken = async(userId)=>{
    try {
           const user = (await User.findById(userId) || await Teacher.findById(userId))
           const accessToken = user.generateAccessToken()
           
           const refreshToken = user.generateRefreshToken()
           
           user.refreshToken = refreshToken
           await user.save({validateBeforeSave : false})
           
           return {accessToken, refreshToken}

    } catch (error) {
       
        throw new ApiError(400, "Error generating tokens")
    }
}


const registerUser = asyncHandler(async (req, res) => {
     const {email,name, password}= req.body             
     if([ email,name,password].some((empty)=>empty?.trim()==="")){
         throw new ApiError(400,"All fields are required")
     }

     const userExists = await User.findOne({
         $or : [{email},{name}]
     })
     if(userExists){  
         throw new ApiError(400, "User Already Exists")
     }
 
     const user = await User.create({
         email,
         name : name.toLowerCase(),
         password,
     })
     const createdUser = await User.findById(user._id).select("-password -refreshToken");
 
     if(!createdUser){
         throw new ApiError(400, "Error creating user")
     }
     return res.status(201).json(new ApiResponse(200, "User created successfully", createdUser));
 });


 const loginUser = asyncHandler(async(req,res)=>{
    //req body
    //username or email
    //find the user
    //password check
    //access and refresh token
    //send cookie
 
    const {email,password,name} = req.body
 //   console.log(req.body)
 //    console.log({email})
    
    if(!name && !password){      //for or (!(email || password))
     throw new ApiError(400, "username or password is required")
    }
    const findUser =await User.findOne({
      name : name
    }) 
   //console.log(findUser)
   
    if(!findUser){
     throw new ApiError(404, "user does not exist")
    }
 
    //console.log(password)
    
    const isPasswordValid = await findUser.isPasswordCorrect(password)                                  
    
    if(!isPasswordValid){
     throw new ApiError(404, "invalid user credentials")
    }
 
      const {accessToken, refreshToken}=(await generateAccessAndRefreshToken(findUser._id))
   //  console.log(accessToken)
 
    const loggedInUser = await User.findById(findUser._id).select("-password -refreshToken") 
 
    const cookieOptions = {
     httpOnly : true,
     secure : true
    }
    //console.log(loggedInUser)
    return  res.status(200).cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions).cookie("userLogged",{secure :true})
    .json(new ApiResponse(200, 
     {
         user :  loggedInUser,
         accessToken,                
         refreshToken
     },
     "User logged in successfully")) 
 });


 const logoutUser = asyncHandler(async(req, res)=>{
    
  await  User.findByIdAndUpdate(req.user?._id, {
      $set :{refreshToken : ""
     }},
    {
    new : true
    }) 
    const cookieOptions = {
    httpOnly : true,
    secure : true
    }
    return res.status(200).clearCookie("accessToken",cookieOptions).clearCookie("refreshToken",cookieOptions).clearCookie("userLogged",{secure :true}).json(new ApiResponse(200, "User logged out successfully"));
 });
 

 export {
    loginUser,
    registerUser, 
    logoutUser}