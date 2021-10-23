const { Router } = require("express");
const User = require("../models/User");
const dotenv = require("dotenv");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = Router();
dotenv.config();


router.post(
  "/registration",
  [
    check("email", "incorrect email").isEmail(),
    check("password", "incorrect password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "incorrect date",
        });
      }

      const { email, password } = req.body;

      const isUsed = await User.findOne({
        email,
      });

      if (isUsed) {
        return res.status(300).json({
          message: "Email already used, try another one !",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({
        message: "User created",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/login",
  [
    check("email", "incorrect email").isEmail(),
    check("password", "incorrect password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "ma'lumot hato",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "hali bazada yoq !" });
      }

      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "parol hato !",
        });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
