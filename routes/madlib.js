const router = require("express").Router();
const db = require("../models");
const isEmail = require("../validator/validators");

//Get Data
router.get("/", async (req, res) => {
  try {
    const data = await db.Madlib.findAll({
      order: [["id", "DESC"]],
    });
    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
});

router.post("/easy", async (req, res) => {
  try {
    const {
      email,
      name,
      username,
      zipcode,
      updates,
      rules,
      colorOne,
      colorTwo,
      schoolSubjectOne,
      favouriteSchoolSport,
      animal,
    } = req.body;

    if (!isEmail(email))
      return res.status(400).json({ message: "Must be a valid email address" });

    const isExist = await db.Madlib.findAll({
      where: {
        email,
      },
    });

    if (isExist.length > 0)
      return res
        .status(400)
        .json({ status: "error", message: "Email already in use.." });

    const data = await db.Madlib.create({
      email,
      name,
      username,
      zipcode,
      updates,
      rules,
      colorOne,
      colorTwo,
      schoolSubjectOne,
      favouriteSchoolSport,
      animal,
      clickCount: 0,
    });

    return res.status(200).json({ status: "success", data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
});

router.post("/intermediate", async (req, res) => {
  try {
    const {
      username,
      email,
      zipcode,
      updates,
      rules,
      numberOne,
      size,
      snackFood,
      adjectiveOne,
      occupation,
      animal,
      largeNumber,
      halloweenCostume,
      exclamation,
    } = req.body;

    if (!isEmail(email))
      return res.status(400).json({ message: "Must be a valid email address" });

    const isExist = await db.Madlib.findAll({
      where: {
        email,
      },
    });

    if (isExist.length > 0)
      return res
        .status(400)
        .json({ status: "error", message: "Email already in use.." });

    const data = await db.Madlib.create({
      username,
      email,
      zipcode,
      updates,
      rules,
      numberOne,
      size,
      snackFood,
      adjectiveOne,
      occupation,
      animal,
      largeNumber,
      halloweenCostume,
      exclamation,
      clickCount: 0,
    });

    return res.status(200).json({ status: "success", data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
});

router.post("/advanced", async (req, res) => {
  try {
    const {
      username,
      email,
      zipcode,
      updates,
      rules,
      numberOne,
      numberTwo,
      schoolSubjectOne,
      schoolSubjectTwo,
      adjectiveOne,
      adjectiveTwo,
      adjectiveThree,
      foodOne,
      foodTwo,
      place,
      yearFromPast,
      object,
      animal,
      name,
      noun,
    } = req.body;

    if (!isEmail(email))
      return res.status(400).json({ message: "Must be a valid email address" });

    const isExist = await db.Madlib.findAll({
      where: {
        email,
      },
    });

    if (isExist.length > 0)
      return res
        .status(400)
        .json({ status: "error", message: "Email already in use.." });

    const data = await db.Madlib.create({
      username,
      email,
      zipcode,
      updates,
      rules,
      numberOne,
      numberTwo,
      schoolSubjectOne,
      schoolSubjectTwo,
      adjectiveOne,
      adjectiveTwo,
      adjectiveThree,
      foodOne,
      foodTwo,
      place,
      yearFromPast,
      object,
      animal,
      name,
      noun,
      clickCount: 0,
    });

    return res.status(200).json({ status: "success", data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
});

router.get("/retrieve", async (req, res) => {
  const { email } = req.body;

  try {
    if (!isEmail(email))
      return res.status(400).json({ message: "Must be a valid email address" });

    const data = await db.Madlib.findAll({
      where: {
        email,
      },
    });

    if (!data.length > 0)
      return res
        .status(400)
        .json({ status: "error", message: "Email not found.." });

    await db.Madlib.update(
      {
        clickCount: data[0].clickCount + 1,
      },
      {
        where: {
          email,
        },
      }
    );

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
});

module.exports = router;
