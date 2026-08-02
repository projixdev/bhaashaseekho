import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    message: { type: String, trim: true, default: "", maxlength: 2000 },
  },
  { timestamps: true }
);

// Guards against OverwriteModelError when this module is re-evaluated during
// Next.js dev hot-reload without the process restarting.
export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
