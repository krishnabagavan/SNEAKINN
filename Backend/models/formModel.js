import mongoose from "mongoose";

const workExperienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
}, { _id: false });

const formSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  newsletter: { type: Boolean },
  workExperience: [workExperienceSchema],
}, { timestamps: true });

const FormModel = mongoose.model("Form", formSchema);

export default FormModel;


