export const HARVEST_BASE_URL = "https://harvest.greenhouse.io";
export const V3_AUTH_BASE_URL = "https://auth.greenhouse.io";
export const V3_BASE_URL = `${HARVEST_BASE_URL}/v3`;
export const V1_MAX_PER_PAGE = 500;
export const V3_MAX_PER_PAGE = 500;
export const V3_POLL_MAX_PAGES = 10;
export const V3_BATCHED_PER_PAGE = 100;
export const V3_BATCHED_POLL_MAX_PAGES = 1;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const V3_DEFAULT_RETRY_AFTER_SECONDS = 30;
export const V3_MAX_RETRY_AFTER_SECONDS = 60;
export const ATTACHMENT_TYPE_MODEL = [
  { label: "Resume", value: "resume" },
  { label: "Cover Letter", value: "cover_letter" },
  { label: "Take-Home Test", value: "take_home_test" },
  { label: "Offer Packet", value: "offer_packet" },
  { label: "Offer Letter", value: "offer_letter" },
  { label: "Signed Offer Letter", value: "signed_offer_letter" },
  { label: "Form Attachment", value: "form_attachment" },
  { label: "Mid-Funnel Agreement", value: "midfunnel_agreement" },
  { label: "Automated Agreement", value: "automated_agreement" },
  { label: "Other", value: "other" },
];
export const ATTACHMENT_VISIBILITY_MODEL = [
  { label: "Admin Only", value: "admin_only" },
  { label: "Private", value: "private" },
  { label: "Public", value: "public" },
];
export const CUSTOM_FIELD_TYPE_MODEL = [
  { label: "Job", value: "job" },
  { label: "Opening", value: "opening" },
  { label: "Standard", value: "standard" },
  { label: "Offer", value: "offer" },
  { label: "Compensation Frequency", value: "compensation_frequency" },
  { label: "Candidate", value: "candidate" },
  { label: "Referral Question", value: "referral_question" },
  { label: "Application", value: "application" },
  { label: "Rejection Question", value: "rejection_question" },
  { label: "Form", value: "form" },
  { label: "Agency Question", value: "agency_question" },
  { label: "User Attribute", value: "user_attribute" },
];
export const DEFAULT_BATCH_SIZE = 50;
