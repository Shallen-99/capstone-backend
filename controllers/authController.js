const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// =========================
// REGISTER
// =========================
exports.register = async (req, res) => {
  try {
    console.log("===== REGISTER ROUTE HIT =====");
    console.log("Request Body:", req.body);

    const { username, email, password } = req.body;

    // Check if fields exist
    if (!username || !email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });

    console.log("User successfully created:", user);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token: generateToken(user._id)
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// =========================
// LOGIN
// =========================
exports.login = async (req, res) => {
  try {
    console.log("===== LOGIN ROUTE HIT =====");
    console.log("Login Body:", req.body);

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token: generateToken(user._id)
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
