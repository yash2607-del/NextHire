import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["applicant", "recruiter", "admin"], required: true, default: "applicant" }
}, {
  timestamps: true,
  versionKey: false
});

const User = mongoose.model("User", userSchema, "users");

const applicantSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, enum: ["Fresher", "1-3 years", "3+ years"], required: true },
  jobType: { type: String, enum: ["Remote", "Hybrid", "On-Site", "Any"], required: true }
}, {
  timestamps: true,
  versionKey: false
});

const Applicant = mongoose.model("Applicant", applicantSchema, "applicant");

const recruiterSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobTitle: { type: String, required: true },
  industry: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema, "recruiter");

export { User, Applicant, Recruiter };
