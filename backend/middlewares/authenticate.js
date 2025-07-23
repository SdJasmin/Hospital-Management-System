import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  // Check for token in `x-auth-token` header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    // Verify token and attach user info to request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user (id) to the request object
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

export default authenticate;
