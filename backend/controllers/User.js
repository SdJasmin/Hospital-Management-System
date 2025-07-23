import Usermodel from "../models/user.js";

// Fetch User Profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the authenticated request
    const user = await Usermodel.findById(userId).select("-password"); // Exclude the password field

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export { getUserProfile };
