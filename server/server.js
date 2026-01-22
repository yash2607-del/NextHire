import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/AuthRoutes.js";
import recruitRoutes from "./routes/RecruitRoute.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { User, Applicant, Recruiter } from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || "https://nexthire-snowy.vercel.app";

// Normalize CORS origins: support comma-separated env var and common dev/preview hosts
const DEFAULT_ALLOWED_ORIGINS = [
  "https://nexthire-snowy.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5000",
];

const envOrigins = CORS_ORIGIN
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const ALLOWED_ORIGINS = Array.from(new Set([...DEFAULT_ALLOWED_ORIGINS, ...envOrigins]));

function isOriginAllowed(origin) {
  if (!origin) return true; // non-browser or same-origin requests

  if (ALLOWED_ORIGINS.includes(origin)) return true;

  try {
    const { hostname } = new URL(origin);

    // Allow localhost variants
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;

    // Allow any Vercel preview/production URL
    if (hostname.endsWith(".vercel.app")) return true;
  } catch (e) {
    console.warn("Invalid Origin header received:", origin);
  }

  return false;
}

// CORS Configuration - allow your Vercel frontend and safe dev origins
const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }

    console.warn("❌ Blocked CORS origin:", origin);
    return callback(null, false);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Must be registered before routes
app.use(cors(corsOptions));
// Ensure preflight (OPTIONS) requests get proper CORS headers
app.options("*", cors(corsOptions));

// Body parsing
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!JWT_SECRET || !MONGOURL) {
  console.error("❌ Environment variables missing! Check your .env file.");
  console.error("Required: JWT_SECRET, MONGO_URL");
  process.exit(1);
}

console.log(`🚀 Starting NextHire Server...`);
console.log(`📝 Environment: ${NODE_ENV}`);
console.log("🔒 Allowed CORS origins:", ALLOWED_ORIGINS);

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
// Backwards-compatible auth routes (so clients calling /login still work)
app.use("/", authRoutes);
app.use("/api", recruitRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contact", contactRoutes);

// Serve the built React app (SPA) whenever it exists.
// Some hosts may not set NODE_ENV='production', so we gate this by
// presence of the build output instead of NODE_ENV.
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // Handle React routing - return index.html for any non-API routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    return res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else if (NODE_ENV === 'production') {
  console.warn('⚠️ client/dist not found; SPA routes like /login will 404.');
}

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
    const user = await User.findOne({ email: decoded.email }).select("name email role");

    if (!user) return res.status(404).json({ error: "User not found" });

    const profileData = {
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Fetch additional role-specific data
    if (user.role === "applicant") {
      const applicantData = await Applicant.findOne({ userId: user._id });
      if (applicantData) {
        profileData.location = applicantData.location;
        profileData.experience = applicantData.experience;
        profileData.jobType = applicantData.jobType;
      }
    } else if (user.role === "recruiter") {
      const recruiterData = await Recruiter.findOne({ userId: user._id });
      if (recruiterData) {
        profileData.company = recruiterData.company;
        profileData.location = recruiterData.location;
        profileData.jobTitle = recruiterData.jobTitle;
        profileData.industry = recruiterData.industry;
      }
    }

    res.json(profileData);
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
