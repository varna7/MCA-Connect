import { db } from "../connect.js";

export const getUsers = (req, res) => {
    const q = "Select * from users";
    console.log("--getuser");
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
  
      if (data.length === 0) {
        console.log("No users");
      }
      console.log("hel", data);
  
      return res.status(200).json({
        message: "NIL",
        status: true,
        users: data,
      });
    });
  };