import mongoose from "mongoose";

const { Schema } = mongoose;

const applicationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  resumeUrl: { type: String },
  status: { type: String, enum: ["applied", "shortlisted", "rejected"], default: "applied" },
  appliedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  versionKey: false
});

const Application = mongoose.model("Application", applicationSchema, "applications");

export default Application;
