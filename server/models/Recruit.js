import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema({
  recruiterId: { type: Schema.Types.ObjectId, ref: "recruiter", required: true },
  title: { type: String, required: true },
  category: { type: String, enum : ["Software Development",
        "Design",
        "Marketing",
        "Sales",
        "Customer Support",
        "Finance",
        "Human Resources",
        "Operations",
        "Legal",
        "Healthcare",
        "Education & Training",
        "Engineering",
        "Data Science & Analytics",
        "Information Technology (IT)",
        "Administrative",
        "Manufacturing",
        "Project Management",
        "Business Development",
        "Consulting",
        "Content Writing",
        "Media & Communication",
        "Product Management",
        "Supply Chain & Logistics",
        "Quality Assurance",
        "Research & Development",
        "Public Relations",
        "Security",
        "Real Estate",
        "Arts & Entertainment",
        "Government & Public Service",
        "Non-profit & NGO",
        "Other"],required: true }, 

  jobType: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Contract"], required: true },
  location: { type: String,enum : ["Online",
          "Hybrid",
          "Offline"], required: true }, 
  salary: { type: Number },
  jobDescription: { type: String, required: true },

  // Skills as tags
  skills: [{ type: String }],

  // Inclusivity checkboxes
  inclusivity: [{ 
    type: String, 
    enum: ["Visual impairment",
        "Hearing impairment",
        "Blindness",
        "Muteness",
        "Upper limbs impairments (hands,arms)",
        "Lower limbs impairments (legs,feet)",
        "Locomoter disability"]
  }],

  // Accommodations checkboxes
  accommodations: [{
    type: String,
    enum: ["Wheelchair access / Ramps",
        "Accessible restrooms",
        "Sign language interpreter",
        "Assistive technology support",
        "Flexible work hours",
        "Remote work option",
        "Personal assistance"]
  }],

  otherRequirements: { type: String },
  deadline: { type: Date },
  contactNumber: { type: String },
  additionalInfo: { type: String }
}, { timestamps: true, versionKey: false });

const Job = mongoose.model("Job", jobSchema, "jobs");

export default Job;
