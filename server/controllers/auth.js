import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Applicant, Recruiter } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, additionalData } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (role === "Applicant") {
      const { location, experience, jobType } = additionalData || {};
      await Applicant.create({
        userId: user._id,
        name,
        location,
        experience,
        jobType,
      });
    } else if (role === "Recruiter") {
      const { company, location, jobTitle, industry } = additionalData || {};
      await Recruiter.create({
        userId: user._id,
        company,
        location,
        jobTitle,
        industry,
      });
    }

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is missing!");
      return res.status(500).json({ error: "Server config error" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Login successful, token issued");

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Server error during login" });
  }
};
