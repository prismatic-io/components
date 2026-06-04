import { input, util } from "@prismatic-io/spectral";
import { API_VERSION } from "./constants";
import { toObject, toOptionalString } from "./util";

export const connectionInput = input({
  label: "Connection",
  required: true,
  type: "connection",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results. Pagination inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});

export const additionalFieldsInput = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that might not be covered by the standard inputs.",
  required: false,
  placeholder: "Enter additional fields",
  example: JSON.stringify({ preferred_first_name: "John" }, null, 2),
  clean: toObject,
});

export const companyIdInput = input({
  label: "Company ID",
  required: true,
  type: "string",
  comments: "A UUID representing a company.",
  example: "00000000-0000-0000-0000-000000000000",
  dataSource: "selectCompany",
  clean: util.types.toString,
});

export const employeeIdInput = input({
  label: "Employee ID",
  required: true,
  type: "string",
  comments: "A UUID representing a employee.",
  example: "00000000-0000-0000-0000-000000000000",
  dataSource: "selectEmployee",
  clean: util.types.toString,
});

export const payScheduleIdInput = input({
  label: "Pay Schedule ID",
  required: true,
  type: "string",
  comments: "A UUID representing a pay schedule.",
  example: "00000000-0000-0000-0000-000000000000",
  dataSource: "selectPaySchedule",
  clean: util.types.toString,
});

export const paginationPageInput = input({
  label: "Pagination Page",
  required: false,
  type: "string",
  comments:
    "Which page of results to fetch. See [Gusto API documentation](https://docs.gusto.com/app-integrations/docs/pagination) for more information.",
  clean: (value) => util.types.toInt(value) || undefined,
});

export const firstNameInput = input({
  label: "First Name",
  required: true,
  type: "string",
  comments: "The employee's first name.",
  clean: util.types.toString,
});

export const middleInitialInput = input({
  label: "Middle Initial",
  required: false,
  type: "string",
  comments: "The employee's middle initial.",
  clean: (value) => (value ? util.types.toString(value) : undefined),
});

export const lastNameInput = input({
  label: "Last Name",
  required: true,
  type: "string",
  comments: "The employee's last name.",
  clean: util.types.toString,
});

export const dateOfBirthInput = input({
  label: "Date of Birth",
  required: false,
  type: "string",
  comments: "The employee's date of birth.",
  clean: util.types.toString,
  example: "1990-12-30",
});

export const emailInput = input({
  label: "Email Address",
  required: false,
  type: "string",
  comments: "The employee's personal email address.",
  clean: util.types.toString,
  example: "john.doe@example.com",
});

export const selfOnboardingInput = input({
  label: "Self Onboarding",
  required: false,
  type: "boolean",
  comments:
    "If true, employee is expected to self-onboard. If false, payroll admin is expected to enter in the employee's onboarding information.",
  clean: util.types.toBool,
  default: "false",
});

export const ssnInput = input({
  label: "Social Security Number",
  required: false,
  type: "string",
  comments: "The employee's social security number.",
  clean: util.types.toString,
  example: "123-45-6789",
});

export const terminationDateInput = input({
  label: "Termination Date",
  required: true,
  type: "string",
  comments: "The date the employee was terminated.",
  clean: util.types.toString,
  example: "2020-12-30",
});

export const runTerminationPayrollInput = input({
  label: "Run Termination Payroll?",
  required: true,
  type: "boolean",
  comments: "Whether to run a termination payroll for the employee.",
  clean: util.types.toBool,
});

export const webhookUrlInput = input({
  label: "Webhook URL",
  required: true,
  type: "string",
  comments: "The URL for the webhook subscription.",
  example: "https://example.com/webhooks",
  clean: util.types.toString,
});

export const subscriptionTypesInput = input({
  label: "Subscription Types",
  required: true,
  type: "text",
  comments:
    "Types of notifications to receive when entities change. Enter as comma-separated values.",
  example: "type1,type2",
  clean: util.types.toString,
});

export const webhookSubscriptionUuidInput = input({
  label: "Webhook Subscription UUID",
  required: true,
  type: "string",
  comments: "The webhook subscription UUID.",
  example: "00000000-0000-0000-0000-000000000000",
  clean: util.types.toString,
});

export const startingAfterUuidInput = input({
  label: "Starting After UUID",
  required: false,
  type: "string",
  comments:
    "Serves as a cursor, returns all events occurring after specified UUID (exclusive).",
  clean: toOptionalString,
});

export const eventTypeInput = input({
  label: "Event Type",
  required: false,
  type: "string",
  comments:
    "A string containing the exact event name or use a wildcard match to filter for a group of events.",
  example: "employee.created",
  clean: toOptionalString,
});

export const limitInput = input({
  label: "Limit",
  required: false,
  type: "string",
  comments:
    "Limits the number of objects returned in a single response, between 1 and 100. Defaults to 25.",
  clean: toOptionalString,
});

export const resourceUuidInput = input({
  label: "Resource UUID",
  required: false,
  type: "string",
  comments:
    "The UUID of the company. If not specified, will return all events for all companies.",
  example: "00000000-0000-0000-0000-000000000000",
  clean: toOptionalString,
});

export const sortOrderInput = input({
  label: "Sort Order",
  required: false,
  type: "string",
  model: [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ],
  comments:
    "Sort resulting events in ascending (asc) or descending (desc) chronological order.",
  clean: toOptionalString,
});

export const apiVersionInput = input({
  label: "API Version",
  required: true,
  type: "string",
  comments: "The API version to use.",
  example: API_VERSION,
  default: API_VERSION,
  clean: util.types.toString,
});
