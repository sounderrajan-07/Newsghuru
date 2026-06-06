const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      });
    }

    // Support both "Bearer <token>" format and raw token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach admin info to request object
    req.admin = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is not valid or has expired",
    });
  }
};

module.exports = auth;
