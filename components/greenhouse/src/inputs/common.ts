import { input, util } from "@prismatic-io/spectral";

const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Greenhouse connection to use.",
});

export const per_page = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments:
    "The maximum number of results to return per page. Must be an integer between 1 and 500.",
  placeholder: "Enter page size",
  example: "100",
  clean: util.types.toNumber,
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  default: "1",
  comments:
    "The 1-based page number to return. Each page contains up to the configured page size.",
  placeholder: "Enter page number",
  example: "1",
  clean: util.types.toNumber,
});

export const email = input({
  label: "Email",
  type: "string",
  required: false,
  comments: "The email address of the user. Must be a valid email address.",
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  clean: cleanString,
});

export const job_id = input({
  label: "Job ID",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The unique identifier for the job to filter by. When supplied, only candidates that have applied to this job (or are prospects for it) are returned.",
  placeholder: "Enter job ID",
  example: "127817",
  dataSource: "jobs",
});

export const created_before = input({
  label: "Created Before",
  type: "string",
  required: false,
  comments:
    "The upper bound timestamp filter — only records created before this value are returned. Format: ISO-8601.",
  placeholder: "Enter timestamp (ISO-8601 format)",
  example: "2024-01-15T10:30:00Z",
  clean: cleanString,
});

export const created_after = input({
  label: "Created After",
  type: "string",
  required: false,
  comments:
    "The lower bound timestamp filter — only records created at or after this value are returned. Format: ISO-8601.",
  placeholder: "Enter timestamp (ISO-8601 format)",
  example: "2024-01-01T00:00:00Z",
  clean: cleanString,
});

export const updated_before = input({
  label: "Updated Before",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The upper bound timestamp filter — only records updated before this value are returned. Format: ISO-8601.",
  placeholder: "Enter timestamp (ISO-8601 format)",
  example: "2024-01-15T10:30:00Z",
});

export const updated_after = input({
  label: "Updated After",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The lower bound timestamp filter — only records updated at or after this value are returned. Format: ISO-8601.",
  placeholder: "Enter timestamp (ISO-8601 format)",
  example: "2024-01-01T00:00:00Z",
});

export const version = input({
  label: "API Version",
  type: "string",
  required: true,
  default: "v1",
  clean: (value: unknown) => {
    const data = util.types.toString(value);
    if (data !== "") {
      return data;
    }
    return "v1";
  },
  comments:
    'The version of the Greenhouse Harvest API to use. Defaults to "v1".',
  placeholder: "Enter API version",
  example: "v1",
});

export const on_behalf_of_user_id = input({
  label: "On Behalf Of User ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the user issuing this request. Required for auditing purposes.",
  placeholder: "Enter user ID",
  example: "92120",
  clean: util.types.toString,
  dataSource: "users",
});

export const first_name = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "The given (first) name of the user.",
  placeholder: "Enter first name",
  example: "John",
  clean: util.types.toString,
});

export const last_name = input({
  label: "Last Name",
  type: "string",
  required: true,
  comments: "The family (last) name of the user.",
  placeholder: "Enter last name",
  example: "Doe",
  clean: util.types.toString,
});

export const office_ids = input({
  label: "Office IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The office identifiers associated with a user. Must be a valid set of office IDs. Passing an empty array does nothing.",
  placeholder: "Enter office IDs",
  example: '["234", "345"]',
  default: ["000xxx"],
  clean: (value) => {
    if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
      return value;
    }
    return undefined;
  },
  dataSource: "offices",
});

export const external_office_ids = input({
  label: "External Office IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The external system office identifiers. May be used instead of Office IDs and represents the ID of the office in an external system. If this is used, Office IDs must be blank and vice versa.",
  placeholder: "Enter external office IDs",
  example: '["abc13425", "13432"]',
  default: ["000xxx"],
  clean: (value) => {
    if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
      return value;
    }
    return undefined;
  },
});

export const department_ids = input({
  label: "Department IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The department identifiers associated with a user. Must be a valid set of department IDs. Passing an empty array does nothing.",
  placeholder: "Enter department IDs",
  example: '["123"]',
  default: ["000xxx"],
  clean: (value) => {
    if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
      return value;
    }
    return undefined;
  },
  dataSource: "departments",
});

export const external_department_ids = input({
  label: "External Department IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The external system department identifiers. May be used instead of Department IDs and represents the ID of the department in an external system. If this is used, Department IDs must be blank and vice versa.",
  placeholder: "Enter external department IDs",
  example: '["EXTERNAL_ID_1234"]',
  default: ["000xxx"],
  clean: (value) => {
    if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
      return value;
    }
    return undefined;
  },
});

export const custom_fields = input({
  label: "Custom Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The JSON array of hashes containing new custom field values. Passing an empty array does nothing. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        id: 12345,
        value: "Custom Value",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const status = input({
  label: "Status",
  type: "string",
  required: false,
  comments:
    "The status to filter applications by. Accepted values are active, converted, hired, and rejected. If anything else is used, an empty response will be returned rather than an error.",
  placeholder: "Enter status",
  example: "active",
  clean: cleanString,
});

export const requisition_id = input({
  label: "Requisition ID",
  type: "string",
  required: false,
  comments:
    "The requisition identifier to filter jobs by. When included, only jobs that match the given requisition_id are returned.",
  placeholder: "Enter requisition ID",
  example: "abc-123",
  clean: cleanString,
});

export const department_id = input({
  label: "Department ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier for the department. When included, only jobs in this specific department are returned.",
  placeholder: "Enter department ID",
  example: "123",
  clean: cleanString,
  dataSource: "departments",
});

export const external_department_id = input({
  label: "External Department ID",
  type: "string",
  required: false,
  comments:
    "The external system department identifier. May be used instead of Department ID and represents the ID of the department in an external system.",
  placeholder: "Enter external department ID",
  example: "EXTERNAL_ID_1234",
  clean: cleanString,
});
