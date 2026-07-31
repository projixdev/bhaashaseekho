import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    // interest/howHeard are plain strings, not a schema enum: the option
    // lists live in content.js and can change without a schema migration.
    // Validity is checked at the API layer (lib/validation.js) instead.
    interest: { type: String, required: true, trim: true },
    howHeard: { type: String, trim: true, default: "" },
    utmSource: { type: String, trim: true, default: "" },
    utmMedium: { type: String, trim: true, default: "" },
    utmCampaign: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

// Guards against OverwriteModelError when this module is re-evaluated during
// Next.js dev hot-reload without the process restarting.
export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
