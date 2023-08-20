import express from "express";
import cors from "cors";
import multer from "multer";
import { db } from "./connect.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/note.js";
import userRoutes from "./routes/users.js";
import collegeRoutes from "./routes/colleges.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import courseRoutes from "./routes/courses.js"
import issueRoutes from "./routes/issues.js"


import cookieParser from "cookie-parser";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());

app.use(cookieParser());
const corsOptions ={
  origin:'http://localhost:3000', 

}
app.use(cors(corsOptions));
// app.use(cors()); 
app.use('/uploads', express.static('uploads'))
app.use("/api/auth", authRoutes);
app.use('/api/notes',noteRoutes);
app.use('/api/users',userRoutes);
app.use('/api/colleges',collegeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/issues", issueRoutes);








const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});



app.get("/", (req, res) => {
  return res.status(200).json("Hello OKsy")
});

  

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
