import { db } from "../connect.js";

export const getSingleCollege = (req, res) => {
    const q = "Select * from colleges where lid = ?";
    console.log("--getsingleCollege");
    console.log(req.query.id);

    db.query(q,[req.query.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      if (data.length === 0) {
        console.log("No users");
      }
      console.log("hel", data);
  
      return res.status(200).json({
        message: "NIL",
        status: true,
        college: data,
      });
    });
  };