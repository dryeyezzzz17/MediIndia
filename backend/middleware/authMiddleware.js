const jwt = require("jsonwebtoken");

//PROTECT ROUTES
exports.protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; 

      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Token invalid or expired",
      });
    }
  }

  return res.status(401).json({
    message: "No token provided",
  });
};

//ADMIN ONLY
exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};
