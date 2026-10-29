const sampleUser = {
  id: 92120,
  first_name: "John",
  last_name: "Doe",
  name: "John Doe",
  job_title: "Senior Recruiter",
  agency_id: null,
  primary_email: "john.doe@example.com",
  deactivated: false,
  site_admin: false,
  employee_id: "EMP-12345",
  created_at: "2024-03-15T10:00:00.000Z",
  updated_at: "2026-05-20T14:30:00.000Z",
  linked_candidate_ids: [1004512],
  office_ids: [50891],
  department_ids: [650],
  emails: ["john.doe@example.com", "jdoe@personal.com"],
  interviewer_tags: [{ id: 42, name: "Technical" }],
  custom_fields: {
    t_shirt_size: {
      name: "T-Shirt Size",
      type: "single_select",
      value: "Large",
    },
  },
};

export const listUsersV3ExamplePayload = {
  data: [
    sampleUser,
    {
      id: 93210,
      first_name: "Jane",
      last_name: "Smith",
      name: "Jane Smith",
      job_title: "Talent Coordinator",
      agency_id: null,
      primary_email: "jane.smith@example.com",
      deactivated: false,
      site_admin: false,
      employee_id: "EMP-12346",
      created_at: "2024-06-01T09:00:00.000Z",
      updated_at: "2026-05-18T11:00:00.000Z",
      linked_candidate_ids: [],
      office_ids: [50891],
      department_ids: [651],
      emails: ["jane.smith@example.com"],
      interviewer_tags: [],
      custom_fields: {},
    },
  ],
};

export const getUserV3ExamplePayload = {
  data: sampleUser,
};

export const createUserV3ExamplePayload = {
  data: {
    id: 94001,
    first_name: "Alice",
    last_name: "Johnson",
    name: "Alice Johnson",
    job_title: null,
    agency_id: null,
    primary_email: "alice.johnson@example.com",
    deactivated: false,
    site_admin: false,
    employee_id: null,
    created_at: "2026-06-05T08:00:00.000Z",
    updated_at: "2026-06-05T08:00:00.000Z",
    linked_candidate_ids: [],
    office_ids: [],
    department_ids: [],
    emails: ["alice.johnson@example.com"],
    interviewer_tags: [],
    custom_fields: {},
  },
};

export const editUserV3ExamplePayload = {
  data: {
    id: 92120,
    first_name: "John",
    last_name: "Doe",
    name: "John Doe",
    job_title: "Principal Recruiter",
    agency_id: null,
    primary_email: "john.doe@example.com",
    deactivated: false,
    site_admin: false,
    employee_id: "EMP-12345",
    created_at: "2024-03-15T10:00:00.000Z",
    updated_at: "2026-06-05T09:00:00.000Z",
    linked_candidate_ids: [1004512],
    office_ids: [50891],
    department_ids: [650],
    emails: ["john.doe@example.com", "jdoe@personal.com"],
    interviewer_tags: [{ id: 42, name: "Technical" }],
    custom_fields: {
      t_shirt_size: {
        name: "T-Shirt Size",
        type: "single_select",
        value: "Large",
      },
    },
  },
};

export const activateUserV3ExamplePayload = {
  data: { success: true },
};

export const deactivateUserV3ExamplePayload = {
  data: { success: true },
};
