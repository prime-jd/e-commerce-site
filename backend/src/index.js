
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import { app } from './app.js';



console.log(process.env.MONGODB_URI);
connectDB()
.then(()=>
{
    app.listen(process.env.PORT, () =>{
        console.log(`Server is running on port ${process.env.PORT || 4000}`);
    })
})
.catch((error)=>
{
    console.log("ERROR :", error);
    throw error;
});


// connect env file as soon as possible
dotenv.config({
    path: "./.env",
});

