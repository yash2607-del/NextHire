import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/AuthRoutes.js";
import recruitRoutes from "./routes/RecruitRoute.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { User } from "./models/User.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// CORS Configuration - More secure for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = CORS_ORIGIN.split(',').map(o => o.trim());
    
    if (allowedOrigins.indexOf(origin) !== -1 || NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!JWT_SECRET || !MONGOURL) {
  console.error("❌ Environment variables missing! Check your .env file.");
  console.error("Required: JWT_SECRET, MONGO_URL");
  process.exit(1);
}

console.log(`🚀 Starting NextHire Server...`);
console.log(`📝 Environment: ${NODE_ENV}`);
console.log(`🔒 CORS Origin: ${CORS_ORIGIN}`);

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

app.use("/api", authRoutes);
app.use("/api", recruitRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contact", contactRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Profile endpoint (should be moved to a separate route file later)
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

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err.stack);
  
  // Don't leak error details in production
  const errorResponse = NODE_ENV === 'production' 
    ? { error: "Something went wrong!" }
    : { error: err.message, stack: err.stack };
    
  res.status(500).json(errorResponse);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

export default app;
