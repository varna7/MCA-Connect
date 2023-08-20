import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerCollege = (req, res) => {
  const q = "SELECT * from login where username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      // return res.status(409).json({ message: "Username exist", status: true });
      return res.status(409).json({ message: "Username exist", status: false });
    //CREATE A NEW USER
    //Hash the password
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO login (`username`,`password`,`type`) VALUES (?)";

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const loginValues = [req.body.username, hashedPassword, "colleges"];

    db.query(q, [loginValues], (err, data) => {
      console.log("login insert");

      if (err) return res.status(500).json(err);

      const logo = "";
      const cover = "";

      const values = [
        req.body.clg_name,
        req.body.email,
        req.body.hod,
        logo,
        cover,
        data.insertId,
      ];

      const q1 =
        "INSERT INTO colleges (`clg_name`,`email`,`hod`,`logo`,`cover`,`lid`) VALUES (?)";
      console.log(values);
      db.query(q1, [values], (err, data) => {
        console.log("college insert");

        console.log("err", err);
        if (err) return res.status(500).json(err);
        console.log("College has been added");
      });

      return res.status(200).json("Authentication details has been created.");
    });
  });
  console.log(req.body);
};

export const registerUser = (req, res) => {
  const q = "SELECT * from login where username = ?";
 
  db.query(q, [req.body.username], (err, data) => {
    console.log("user", data);
    if (err) return res.status(500).json(err);
    if (data.length)
      // return res.status(409).json({ message: "Username exist", status: true });
      return res.status(409).json({ message: "Username exist", status: false });
    //CREATE A NEW USER
    //Hash the password
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO login (`username`,`password`,`type`) VALUES (?)";

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const loginValues = [req.body.username, hashedPassword, "users"];

    db.query(q, [loginValues], (err, data) => {
      console.log("login insert");
      console.log(data);
      console.log(err);
      if (err) return res.status(500).json(err);

      const profile = "";
      const cover = "";
      var cid ; 
      const q2="SELECT lid from colleges where clg_name=?"
      db.query(q2,[req.body.college],(err,data)=>{
    
        cid=data[0].lid
        console.log("HIIIIII",cid)
        console.log(err)
      })
      console.log("bbbb",cid)

      const values = [
        req.body.name,
        req.body.email,
        req.body.college,
        req.body.batch,
        req.body.status,
        profile,
        cover,
        data.insertId,
        cid,
      ];

      const q1 =
        "INSERT INTO users (`name`,`email`,`college`,`batch`,`status`,`profile`,`cover`,`lid`,`cid`) VALUES (?)";



      db.query(q1, [values], (err, data) => {
        console.log("user insert");
        console.log(data);
        console.log(err);
        if (err) return res.status(500).json(err);
        console.log("User has been added");
        // return res.status(200).json("User has been added.");
      });

      return res.status(200).json("Authentication details has been created.");
    });
  });
  console.log(req.body);
};

export const register = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (`name`,`email`,`college`,`batch`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};





export const login = (req, res) => {
  const q = "SELECT * FROM login WHERE username = ? ";
  console.log("---Login");
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data)
    if (data.length === 0) {
      console.log("No user");

      return res.status(200).json({message:"User not found!",status:false});
    }
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    console.log("---pass",checkPassword);
    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];
try {
  res
  .cookie("accessToken", token, {
    httpOnly: true,
  })
  .status(200)
  .json({
    message: "success",
    status: true,
    login: data[0],
  });

} catch (error) {
  console.log("err",error)
}
   

    
    
    // return res.status(200).json({
    //   message: "success",
    //   status: true,
    //   login: data[0],
    // });
  });
};

export const getCollege = (req, res) => {
  const q = `Select *,l.status as lstatus from colleges as c INNER JOIN login as l ON c.lid=l.id`;
  console.log("--getcollege");

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      console.log("No colleges");
    }

    return res.status(200).json({
      message: "NIL",
      status: true,
      college: data,
    });
  });
};

// export const viewUser = (req, res) => {
//   const q = "SELECT * FROM login";
//   console.log("---Login");
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);

//     if (data.length === 0) {
//       console.log("No user");

//     }
//     console.log("hel", err);

//     return res.status(200).json({
//       message:"NIL",
//       status:true,
//       users:data
//     });

//   });
// };

export const changeUserStatus = (req, res) => {
  const id = req.params.id;

  const q = "UPDATE login set status=1  WHERE id = ?";
  console.log("---Login");
  db.query(q, [id], (err, data) => {
    if (err) throw err;

    // if (true)
    //   return res.status(500).json({
    //     message: "Error Occured",
    //     status: true,
    //   });
  });
  return res.status(200).json({
    message: "Changed",
    status: true,
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
