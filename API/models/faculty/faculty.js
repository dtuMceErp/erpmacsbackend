const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*===============================
	HELPER DEFINITIONS
================================*/

const Education = new Schema({
  university: {
    type: String,
    required: true,
  },
  degree: { type: String },
  isOngoing: { type: Boolean , 
    default: false
  },
  passingYear: { type: String },
  specialization: { type: String },
});

const OtherExam = new Schema({
  name: String,
  passingYear: String,
  validTill: String,
  link: String,
  marksSecured: Number,
  totalMarks: Number,
});

const Publication = new Schema({
  title: String,
  description: String,
  publisherName: String,
  publishedIn: {
    type: String,
    enum: ["Conference", "Journal", "Book"],
    required: true,
  },
  organizedBy: String,
  ISSN_or_ISBN_number: String,
  apiScore: String,
  impactFactor: String,
  isPeerReviewed: Boolean,
  coAuthorCount: Number,
  publishedDate: Date,
  role: {
    type: String,
    enum: ["Co-Author", "Primary Author", "Secondary Author", "Mentor"],
    required: true,
  },
  isInternational: { type: Boolean },
  pageNo: Number,
  isOngoing: Boolean,
  remarks: String,
  grant: String,
  isPatent: Boolean,
});

const professionalActivities = new Schema({
  title: String,
  description: String,
  venue: String,
  date: Date,
  category: {
    type: String,
    enum: ["Seminars", "Conferences", "Workshops", "Expert Lectures", "Other"],
  },
  otherCategoryName: String,
  attachment: [{ url: String, label: String }],
});

/*===============================
	SUB-DETAILS OF FAUCLTY
================================*/

const personalInformation = new Schema({
  fatherName: String,
  motherName: String,
  email: String,
  phone: String,
  spouseName: String,
  dob: {
    type: Date,
  },
  category: {
    type: String,
    enum: ["GEN", "EWS", "OBC", "SC", "ST"],
  },
  correspondenceAddress: String,
  permanentAddress: String,
});

const academicQualifications = new Schema({
  graduateDegree: {
    type: Education,
  },
  postGraduateDegree: {
    type: Education,
  },
  PHD: {
    type: Education,
  },
  otherExam: [OtherExam],
});

const Experience = new Schema({
  institution: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  natureOfAppointment: {
    type: String,
    enum: ["Regular", "Fixed term", "Temporary", "Adhoc"],
    required: true,
  },
  natureOfDuties: String,
  payScale: String,
  dateOfJoining: Date,
  isOngoing: Boolean,
  dateOfLeaving: Date,
  remarks: String,
});

/* =====================================
	MAIN BODY OF THE FACULTY SCHEMA
=======================================*/

const facultySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fieldsOfSpecialization: [String],
  contributionTowardsDepartment: [String],
  contributionTowardsUniversity: [String],
  otherInfomation: String,

  personalInformation: {
    type: personalInformation,
  },
  academicQualifications: {
    type: academicQualifications,
  },
  experience: {
    experience: [Experience],
    teachingExperience: {
      PG_classes: Number,
      UG_classes: Number,
    },
    researchExperience: {
      total: Number,
      years_spent_in_PHD: Number,
      years_guiding_PHD: Number,
    },
  },
  publications: [Publication],
  professionalActivities: [professionalActivities],
});

module.exports = mongoose.model("Faculty", facultySchema);
