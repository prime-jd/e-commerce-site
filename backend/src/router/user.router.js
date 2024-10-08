import { Router } from "express";
import { addToCart, buyFromStore, displayCart ,displayFeedback,giveFeedback,removeFromCart} from "../controllers/product.controller.js";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router()
router.get('/test', (req, res) => {
    res.send("<h1>hey buddy<h1>")
})
router.post('/signup', registerUser)
router.post('/login' ,loginUser);
router.post('/logout',verifyJwt, logoutUser)
router.post('/feedback', giveFeedback);
router.post('/getfeedback', displayFeedback);
router.post('/buyfs', buyFromStore);
router.get('/cart', displayCart);
router.post('/addtocart', addToCart);
router.post('/cartremove', removeFromCart);
export default router;