import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if the Authorization header is present and properly formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Login to add items to cart" });
  }

  // 2. Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user ID to the request (you can use req.user or req.body.userId depending on your flow)
    req.body.userId = decoded.id;

    next(); // ✅ Go to next middleware or controller
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
