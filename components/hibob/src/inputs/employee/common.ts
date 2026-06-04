import { input, util } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
  cleanCodeInput,
  cleanStringInput,
  validateDate,
} from "../../util";

export const identifier = input({
  label: "Employee Identifier",
  type: "string",
  required: true,
  comments: "The employee's ID or email address.",
  example: "3332883884017713238",
  placeholder: "Enter employee ID or email",
  clean: util.types.toString,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "The given name of the employee.",
  example: "John",
  placeholder: "Enter employee's first name",
  clean: util.types.toString,
});

export const surname = input({
  label: "Surname",
  type: "string",
  required: true,
  comments: "The last name or family name of the employee.",
  example: "Doe",
  placeholder: "Enter employee's surname",
  clean: util.types.toString,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "The work email address assigned to the employee.",
  example: "john.doe@example.com",
  placeholder: "Enter employee's email address",
  clean: util.types.toString,
});

export const site = input({
  label: "Site",
  type: "string",
  required: true,
  comments: "The office location or branch assigned to the employee.",
  example: "London",
  placeholder: "Enter employee's site",
  clean: util.types.toString,
});

export const startDate = input({
  label: "Start Date",
  type: "string",
  required: true,
  comments: "The date when the employee begins employment. Format: YYYY-MM-DD.",
  example: "2024-01-01",
  placeholder: "Enter start date (YYYY-MM-DD)",
  clean: (value) => validateDate(value, "Start Date"),
});

export const fieldsSearch = input({
  label: "Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "An optional list of fields to be returned in the response. When not specified, a default set of fields and categories are returned.",
  example: JSON.stringify(["root.fullName", "root.id"], null, 2),
  clean: (value) => cleanArrayCodeInput(value, "Fields"),
});

export const fieldsRead = input({
  label: "Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "An optional list of fields to be returned in the response. When not specified, a default set of fields and categories are returned.",
  example: JSON.stringify(["root.name", "root.email"], null, 2),
  clean: (value) => cleanArrayCodeInput(value, "Fields"),
});

export const fieldsUpdate = input({
  label: "Fields",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The fields to update for the employee. This should be a JSON object containing the field paths and their new values.",
  example: JSON.stringify(
    {
      home: {
        mobilePhone: "63635356",
      },
      firstName: "Jacky",
    },
    null,
    2,
  ),
  clean: (value: unknown) => cleanCodeInput(value, "Fields"),
});

export const filters = input({
  label: "Filters",
  type: "code",
  language: "json",
  required: false,
  comments:
    "An optional filter based on a field and a condition to filter the results.",
  example: JSON.stringify(
    [
      {
        fieldPath: "root.id",
        operator: "equals",
        values: ["<employee ID>"],
      },
    ],
    null,
    2,
  ),
  clean: (value) => cleanArrayCodeInput(value, "Filters"),
});

export const showInactive = input({
  label: "Show Inactive",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, includes inactive employees in the response.",
  clean: util.types.toBool,
});

export const humanReadable = input({
  label: "Human Readable",
  type: "string",
  required: false,
  model: [
    {
      label: "APPEND",
      value: "APPEND",
    },
    {
      label: "REPLACE",
      value: "REPLACE",
    },
  ],
  comments:
    'A flag that determines the data format to be returned in the response payload. Use this flag to convert "machine format" numeric IDs, such as "1644513820829" to the "human readable" values.',
  placeholder: "Select data format",
  clean: cleanStringInput,
});

export const taskStatus = input({
  label: "Task Status",
  type: "string",
  required: false,
  comments:
    "Filter tasks by open / closed status. Not sending any value will return all tasks.",
  model: [
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
  ],
  placeholder: "Select task status",
  clean: cleanStringInput,
});

export const terminationDate = input({
  label: "Termination Date",
  type: "string",
  required: true,
  comments:
    "The date when the employee's termination takes effect (YYYY-MM-DD format).",
  example: "2024-03-15",
  placeholder: "Enter termination date (YYYY-MM-DD)",
  clean: (value) => validateDate(value, "Termination Date"),
});

export const terminationReason = input({
  label: "Termination Reason",
  type: "string",
  required: false,
  comments: "The ID of the 'terminationReason' list entry.",
  example: "Redundant",
  placeholder: "Enter termination reason ID",
  clean: cleanStringInput,
});

export const reason = input({
  label: "Reason",
  type: "string",
  required: false,
  comments: "The ID of the 'lifecycleReasonType' list entry.",
  example: "End of Contract",
  placeholder: "Enter lifecycle reason ID",
  clean: cleanStringInput,
});

export const noticePeriod = input({
  label: "Notice Period",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The duration of the notice period before the employee's departure. Provide as a JSON object with 'length' and 'unit' properties.",
  example: JSON.stringify(
    {
      length: 30,
      unit: "days",
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInput(value, "Notice Period"),
});

export const lastDayOfWork = input({
  label: "Last Day of Work",
  type: "string",
  required: false,
  comments:
    "The final working date before the employee's departure. Format: YYYY-MM-DD.",
  example: "2025-09-22",
  placeholder: "Enter last day of work (YYYY-MM-DD)",
  clean: (value) =>
    value ? validateDate(value, "Last Day of Work") : undefined,
});
