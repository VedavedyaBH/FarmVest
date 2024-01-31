const jwt = require("jsonwebtoken");

const JWT_SECRET = "CantbeHyacked";

exports.createToken = (userId) => {
  try {
    console.log(userId);
    const SignUpJWT = jwt.sign(userId, JWT_SECRET);

    return SignUpJWT;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.verifyJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    const decodedToken = jwt.verify(jwtToken, JWT_SECRET);

    if (decodedToken.userId) {
      next();
    } else {
      res.status(403).json({
        message: "You are not authorized",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};