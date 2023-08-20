import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/post.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", getPosts);


router.post("/add", upload.single("file"), addPost);
router.delete("/:id", deletePost);

export default router;
