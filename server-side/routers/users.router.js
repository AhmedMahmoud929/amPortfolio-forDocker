const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");

// => SIGNUP
// router.get("/register", async (req, res) => {
//   const { email, password, isAdmin } = req.body;
//   try {
//     const hashedPass = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashedPass, isAdmin });
//     await newUser.save();
//     console.log(newUser);
//     res.status(200).json(newUser);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

// => LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) res.status(404).json("User Not Found");
    else {
      const matching = await bcrypt.compare(password, user.password);

      if (!matching) res.status(404).json("Invalid Password");
      else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });
        res.status(200).json({ message: "Login Success", token });
      }
    }
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
