const Logout = async (req, res) => {
  try {
    res.clearCookie("JWT_token", {
      httpOnly: true,
      secure: true,      // MUST match login
      sameSite: "none"   // MUST match login
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server problem"
    });
  }
};

export default Logout;
