import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const userType = req.query.userType;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    console.log(userId);
    let q;
    if (userId == undefined) {
      console.log(1);
      q = `SELECT p.*, u.lid AS userId, name, profile FROM post AS p JOIN ${userType} AS u ON (u.id = p.uid)  ORDER BY p.created_at DESC`;
    } else {
      console.log(2);

      q = `SELECT p.*, u.lid AS userId, name, profile FROM post AS p JOIN ${userType} AS u ON (u.id = p.uid) WHERE p.uid = ? ORDER BY p.created_at DESC`;
    }
    //     : `SELECT p.*, u.lid AS userId, name, profile FROM posts AS p JOIN ${userType} AS u ON (u.id = p.uid)
    // LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    // ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({
        status: true,
        message: "Data fetch success",
        posts: data,
      });
    });
  });
};

export const addPost = (req, res) => {
  console.log(req.file.filename);
  console.log("token", req.cookies.accessToken);
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    console.log(req.file)
    let img = req.file.path;
    console.log(req.body);
    const q =
      "INSERT INTO post (`desc`, `post_img`, `created_at`, `uid`) VALUES (?)";
    const values = [
      req.body.desc,
      img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req?.body.uid,
    ];

    db.query(q, [values], (err, data) => {
      if (err)
        return res.status(500).json({
          status: false,
          message: "Error",
          error: err,
        });
      return res.status(200).json({
        status: true,
        message: "Post created",
      });
    });
  });
};
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM post WHERE `post_id`=? AND `uid` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};
