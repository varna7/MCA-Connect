import { db } from "../connect.js";

export const addCourse = (req, res) => {
  const q = "INSERT INTO courses (`course_name`,`sem`)VALUES (?,?)";
  console.log(req.body);
  db.query(q, [req.body.course, req.body.sem], (err, data) => {
    console.log("---course", data);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Ucourse has been created.");
    console.log(err);
  });
};

export const getCourse = (req, res) => {
    const q = "Select * from courses";
    console.log(req.body);
    db.query(q,  (err, data) => {
      console.log("---course", data);
      if (err) return res.status(500).json(err);
      if (data.length === 0) {
        console.log("No courses");
      }
      
  
      return res.status(200).json({
        message: "NIL",
        status: true,
        course: data,
      });
    });
  };
