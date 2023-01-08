const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const user_id = decodedToken.userId;
    const user_email = decodedToken.email;
    const user_role = decodedToken.role;
    req.id = { user_id };
    req.email = { user_email };
    req.role = { user_role };
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token provided!",
      error: err,
    });
  }
}

module.exports = {
  checkAuth: checkAuth,
};
