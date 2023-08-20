import { db } from "../connect.js";

export const postIssue = (req, res) => {
    const q = "INSERT INTO issues (`type`,`topic`,`desc`)VALUES (?,?,?)";
    console.log(req.body);
    db.query(q, [req.body.type, req.body.topic,req.body.desc], (err, data) => {
      console.log("---issues", data);
      if (err) return res.status(500).json(err);
      return res.status(200).json("issue has been added.");
      console.log(err);
    });
}