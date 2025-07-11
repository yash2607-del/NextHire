import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  company_name: {
    type: String,
    required: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  job_title: {
    type: String,
    required: true
  },
  company_location: {
    type: String,
    required: false
  },
  job_category: {
    type: String,
    required: false
  },
  Description: {
    type: String,
    required: false
  },
  job_city: {
    type: String,
    required: false
  },
  salary: {
    type: String,
    required: false
  },
  job_description: {
    type: String,
    required: false
  },
  skills: {
    type: [String],
    default: []
  },
  InclusionFor: {
    type: [String],
    default: []
  },
  Accomodations: {
    type: [String],
    default: []
  },
  OtherTools: {
    type: [String],
    default: []
  },
  Deadline: {
    type: Date,
    required: false
  },
  ContactNo: {
    type: String,
    required: false
  },
  AdditionalData: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false // Since we're manually handling created_at
});

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);

export default Recruiter;