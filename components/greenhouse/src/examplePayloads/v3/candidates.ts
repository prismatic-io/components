import type { V3Candidate } from "../../types/v3";

const sampleCandidate: V3Candidate = {
  id: 53883394,
  first_name: "Jane",
  last_name: "Doe",
  company: "Acme Corporation",
  title: "Senior Software Engineer",
  created_at: "2026-01-10T15:00:00.000Z",
  updated_at: "2026-05-20T14:00:00.000Z",
  last_activity: "2026-05-20T14:00:00.000Z",
  is_private: false,
  email_addresses: [{ value: "jane.doe@example.com", type: "personal" }],
  phone_numbers: [{ value: "555-867-5309", type: "mobile" }],
  addresses: [{ value: "123 Main St, New York, NY 10001", type: "home" }],
  website_addresses: [{ value: "https://janedoe.dev", type: "portfolio" }],
  social_media_addresses: [{ value: "linkedin.com/in/janedoe" }],
  tags: ["Senior", "Remote"],
  custom_fields: {},
};

export const listCandidatesV3ExamplePayload = {
  data: [sampleCandidate],
};

export const getCandidateV3ExamplePayload = {
  data: sampleCandidate,
};

export const createCandidateV3ExamplePayload = {
  data: {
    candidate: sampleCandidate,
    application: {
      id: 1003961,
      candidate_id: 53883394,
      job_id: 215725,
      job_post_id: null,
      referrer_id: null,
      source_id: null,
      recruiter_id: 92120,
      coordinator_id: null,
      stage_id: 1700,
      stage_name: "Application Review",
      status: "in_process",
      prospect: false,
      needs_decision: false,
      rejection_reason_id: null,
      created_at: "2026-05-21T08:00:00.000Z",
      updated_at: "2026-05-21T08:00:00.000Z",
      last_activity_at: "2026-05-21T08:00:00.000Z",
      custom_fields: null,
      answers: [],
    },
  },
};

export const editCandidateV3ExamplePayload = {
  data: {
    ...sampleCandidate,
    title: "Staff Software Engineer",
    updated_at: "2026-06-01T12:00:00.000Z",
  },
};

export const deleteCandidateV3ExamplePayload = {
  data: {
    id: 53883394,
    created_at: "2026-01-10T15:00:00.000Z",
    updated_at: "2026-06-05T09:00:00.000Z",
    message: "Candidate 53883394 deleted successfully",
  },
};
