import  express  from "express";
import { login,register,logout,registerUser,registerCollege,getCollege,changeUserStatus } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/registerUser", registerUser)
router.post("/registerCollege", registerCollege)
router.post("/change-status/:id",changeUserStatus)
// router.get("/view", viewUser) 
router.get("/getCollege",getCollege)  

export default router
 
