const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  // const publicKey = req.headers.publicKey;
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token: ", token);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const user = jwt.decode(token);
    console.log("user: ", user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized!",
    });
  }
};

module.exports = authenticateToken;
