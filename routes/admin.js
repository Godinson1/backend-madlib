const router = require("express").Router();
const db = require("../models");
const config = require("../helpers/secrets");
const isEmail = require("../validator/validators");
const jwt = require("jsonwebtoken");

//Register Admin
router.route("/register").post(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Please fill all details.." });

  if (!isEmail(email))
    return res.status(400).json({ message: "Must be a valid email address" });

  try {
    const isExist = await db.Admin.findAll({
      where: {
        email,
      },
    });

    if (isExist.length > 0)
      return res.status(400).json({ message: "User with email already exist" });

    const adminUser = {
      name,
      email,
      password,
    };

    bcrypt.genSalt(10, async (error, salt) => {
      bcrypt.hash(adminUser.password, salt, async (error, hash) => {
        if (error) throw error;
        adminUser.password = hash;

        const admin = await db.Admin.create({
          email,
          name,
          password,
        });

        return res.status(200).json({
          message: "Admin Registered successfully",
          admin,
        });
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong.." });
  }
});

//Admin Login

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please fill all details.." });

  if (!isEmail(email))
    return res.status(400).json({ message: "Must be a valid email address" });

  const admin = await db.Admin.findAll({
    where: {
      email,
    },
  });

  if (!admin.length > 0)
    return res
      .status(400)
      .json({ message: `Admin with ${email} does not exist` });

  try {
    jwt.sign(
      { id: admin._id, email: admin.email },
      config.JWT_KEY,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({
          token,
          admin,
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong.." });
  }
});

module.exports = router;
