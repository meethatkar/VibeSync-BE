const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: "token not found",
    });
  }

  try {
    const isTokenBlacklisted = await redis.get(token);
    if (isTokenBlacklisted) {
      return res.status(401).json({
        message: "token is blacklisted",
      });
    }
  } catch (err) {
    // Ignore redis connection error
  }

  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Error occured in jwt verification");
    return res.status(400).json({
      message: "Error occured in jwt verification",
      error,
    });
  }

  req.user = decode;
  next();
};

module.exports = verifyUser;
