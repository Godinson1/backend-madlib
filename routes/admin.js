const router = require("express").Router();
const db = require("../models");
const config = require("../helpers/secrets");
const isEmail = require("../validator/validators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Register Admin
router.route("/register").post(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ status: "error", message: "Please fill all details.." });

  if (!isEmail(email))
    return res
      .status(400)
      .json({ status: "error", message: "Must be a valid email address" });

  try {
    const isExist = await db.Admin.findAll({
      where: {
        email,
      },
    });

    if (isExist.length > 0)
      return res
        .status(400)
        .json({ status: "error", message: "User with email already exist" });

    const admin = await db.Admin.create({
      email,
      name,
      password,
    });

    return res.status(200).json({
      status: "success",
      message: "Admin Registered successfully",
      admin,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong.." });
  }
});

//Admin Login
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ status: "error", message: "Please fill all details.." });

  if (!isEmail(email))
    return res
      .status(400)
      .json({ status: "error", message: "Must be a valid email address" });

  try {
    const admin = await db.Admin.findAll({
      where: {
        email,
      },
    });

    if (!admin.length > 0)
      return res.status(404).json({
        status: "error",
        message: `Admin with ${email} does not exist`,
      });

    const checkPassword = await bcrypt.compare(password, admin[0].password);
    if (!checkPassword)
      return res.status(400).json({
        status: "error",
        message: "Invalid credentials.. Check and try again!",
      });

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
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong.." });
  }
});

//Get all admin data
router.route("/").get(async (req, res) => {
  try {
    const data = await db.Admin.findAll({});

    return res.status(200).json({
      status: "error",
      message: "Admin Registered successfully",
      data,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong.." });
  }
});

module.exports = router;
