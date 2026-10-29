import type { V3Job } from "../../types/v3";

const jobObject: V3Job = {
  id: 107761,
  name: "Senior Software Engineer - Backend",
  requisition_id: "REQ-2026-001",
  status: "open",
  confidential: false,
  is_template: false,
  copied_from_id: 127817,
  department_id: 650,
  office_ids: [50891],
  created_at: "2026-01-10T15:00:00.000Z",
  opened_at: "2026-01-12T09:00:00.000Z",
  closed_at: null,
  updated_at: "2026-05-20T14:00:00.000Z",
  notes: "<p>Looking for candidates with 7+ years of Go experience.</p>",
  custom_fields: {
    target_salary: {
      name: "Target Salary",
      type: "currency",
      value: { amount: 130000, currency_code: "USD" },
    },
  },
};

export const listJobsV3ExamplePayload: { data: V3Job[] } = {
  data: [
    jobObject,
    {
      id: 107762,
      name: "Product Designer",
      requisition_id: "REQ-2026-002",
      status: "draft",
      confidential: false,
      is_template: false,
      copied_from_id: null,
      department_id: 651,
      office_ids: [50891, 50892],
      created_at: "2026-02-01T10:00:00.000Z",
      opened_at: null,
      closed_at: null,
      updated_at: "2026-05-21T08:30:00.000Z",
      notes: null,
      custom_fields: {},
    },
  ],
};

export const getJobV3ExamplePayload: { data: Record<string, unknown> | null } =
  {
    data: jobObject as Record<string, unknown>,
  };

export const createJobV3ExamplePayload = {
  data: {
    id: 107763,
    name: "Senior Software Engineer - Backend",
    requisition_id: null,
    status: "draft" as const,
    confidential: false,
    is_template: false,
    copied_from_id: 127817,
    department_id: 650,
    office_ids: [50891],
    created_at: "2026-06-05T12:00:00.000Z",
    opened_at: null,
    closed_at: null,
    updated_at: "2026-06-05T12:00:00.000Z",
    notes: null,
    custom_fields: {},
  },
};

export const editJobV3ExamplePayload = {
  data: {
    ...jobObject,
    name: "Staff Software Engineer - Backend",
    updated_at: "2026-06-05T14:30:00.000Z",
    office_ids: [50891, 50893],
  },
};
