import  express  from "express";
const router = express.Router()


router.post("/add", (req,res)=>{
    console.log(req.body)
    return res.status(200).json({
        "id":53453,
        "message":"success"
    })
})

export default router
