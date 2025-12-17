import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/AuthRoutes.js";
import recruitRoutes from "./routes/RecruitRoute.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { User } from "./models/User.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());

if (!JWT_SECRET || !MONGOURL) {
  console.error("Environment variables missing! Check your .env file.");
  process.exit(1);
}

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));

app.use("/api", authRoutes);
app.use("/api",recruitRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/api/profile", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Malformed token" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).select("name email");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ name: user.name, email: user.email });
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
