import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../supabaseClient.js"; // Import Supabase client

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Register request received:", { name, email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      throw error;
    }

    console.log("User registered successfully:", data);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", { email });

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Supabase select error:", error.message);
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log("User logged in successfully:", user);
    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: error.message });
  }
};