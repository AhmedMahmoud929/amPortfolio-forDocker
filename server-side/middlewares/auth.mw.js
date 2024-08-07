const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    res.status(401).json({ error: "Authorization token required" });
  else {
    const token = authorization && authorization.split(" ")[1];
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(userId);
      if (user.isAdmin) next();
      else {
        res.status(401).json({ error: "Request is not authorized" });
      }
    } catch (error) {
      // console.log(error);
      res.status(401).json({ error: "Request is not authorized" });
    }
  }
};
