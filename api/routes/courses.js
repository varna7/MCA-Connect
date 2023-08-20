import  express  from "express";
import { addCourse, getCourse } from "../controllers/courses.js";


const router = express.Router()

router.post("/addCourse",addCourse);
router.get("/getCourse",getCourse)

export default router

