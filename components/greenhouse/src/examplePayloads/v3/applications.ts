import type { V3Application } from "../../types";

const sampleApplication: V3Application = {
  id: 69306314,
  candidate_id: 57683957,
  job_id: 123456,
  job_post_id: 234567,
  referrer_id: 4080,
  source_id: 2,
  recruiter_id: 92120,
  coordinator_id: 92121,
  stage_id: 1109787,
  stage_name: "Application Review",
  status: "in_process",
  prospect: false,
  needs_decision: false,
  rejection_reason_id: null,
  created_at: "2026-01-15T09:00:00.000Z",
  updated_at: "2026-05-20T14:30:00.000Z",
  last_activity_at: "2026-05-20T14:30:00.000Z",
  custom_fields: {
    salary_expectation: "80000",
  },
  answers: [
    { question: "Are you authorized to work in the US?", answer: "Yes" },
  ],
  prospective_job_ids: [],
};

export const listApplicationsV3ExamplePayload = {
  data: [sampleApplication],
};

export const getApplicationV3ExamplePayload = {
  data: sampleApplication,
};

export const editApplicationV3ExamplePayload = {
  data: {
    ...sampleApplication,
    source_id: 3,
    recruiter_id: 92122,
    updated_at: "2026-06-05T10:00:00.000Z",
  } as V3Application,
};

export const deleteApplicationV3ExamplePayload = {
  data: {
    message: "Application 69306314 deleted successfully",
    id: 69306314,
    created_at: "2026-01-15T09:00:00.000Z",
    updated_at: "2026-06-05T10:00:00.000Z",
  },
};

export const rejectApplicationV3ExamplePayload = {
  data: { success: true },
};

export const unrejectApplicationV3ExamplePayload = {
  data: { success: true },
};
