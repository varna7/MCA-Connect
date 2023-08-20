import  express  from "express";
import { postIssue } from "../controllers/issues.js";


const router = express.Router()

router.post("/",postIssue);


export default router