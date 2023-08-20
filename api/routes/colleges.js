import  express  from "express";
import {getSingleCollege} from "../controllers/colleges.js";

const router = express.Router()


router.get("/getSingleCollege",getSingleCollege)  

export default router
 