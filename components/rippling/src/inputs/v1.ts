import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL_V1 } from "../constants";
import { toOptionalNumber, toOptionalString } from "../utils";
import { connection, fetchAll } from "./general";





export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  placeholder: "Enter maximum number of results",
  example: "100",
  clean: toOptionalNumber,
  comments: "Sets a limit on the number of returned values.",
});

export const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  placeholder: "Enter number of results to skip",
  example: "0",
  clean: toOptionalNumber,
  comments: "Number of results to skip before returning values.",
});


export const v1PaginationInputs = {
  fetchAll,
  limit,
  offset,
};


export const v1PaginationOnlyInputs = {
  limit,
  offset,
};





export const getCompaniesInputs = {
  connection,
};





const employeeId = input({
  label: "Employee ID",
  type: "string",
  required: true,
  placeholder: "Enter employee ID",
  example: "123456",
  clean: util.types.toNumber,
  comments: "The unique identifier for the employee in Rippling.",
});

const ein = input({
  label: "EIN",
  type: "string",
  required: false,
  placeholder: "Enter EIN",
  example: "123456789",
  clean: toOptionalNumber,
  comments:
    "Employer Identification Number (EIN), also known as the Federal Employer Identification Number or Federal Tax Identification Number.",
});

export const getEmployeesInputs = {
  connection,
  ...v1PaginationInputs,
};

export const getEmployeesEmployeeIdInputs = {
  connection,
  employeeId,
};

export const getEmployeesIncludeTerminatedInputs = {
  connection,
  ein,
  ...v1PaginationInputs,
};





export const getDepartmentsInputs = {
  connection,
  ...v1PaginationInputs,
};





export const getTeamsInputs = {
  connection,
  ...v1PaginationInputs,
};





export const getWorkLocationsInputs = {
  connection,
  ...v1PaginationInputs,
};





export const getCustomFieldsInputs = {
  connection,
  ...v1PaginationInputs,
};





export const getLevelsInputs = {
  connection,
  ...v1PaginationInputs,
};





export const getMeInputs = {
  connection,
};





export const getSamlIdpMetadataInputs = {
  connection,
};





export const postMarkAppInstalledInputs = {
  connection,
};





const startDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  placeholder: "Enter start date",
  example: "2024-01-01T00:00:00Z",
  clean: toOptionalString,
  comments: "ISO 8601 timestamp to list activity after (inclusive).",
});

const endDate = input({
  label: "End Date",
  type: "string",
  required: false,
  placeholder: "Enter end date",
  example: "2024-12-31T23:59:59Z",
  clean: toOptionalString,
  comments: "ISO 8601 timestamp to list activity before (inclusive).",
});

const next = input({
  label: "Next",
  type: "string",
  required: false,
  placeholder: "Enter pagination cursor",
  example: "eyJpZCI6MTIzNDU2fQ==",
  clean: toOptionalString,
  comments: "Pagination cursor token for retrieving the next page of results.",
});

const activityLimit = input({
  label: "Limit",
  type: "string",
  required: false,
  placeholder: "Enter maximum number of results",
  example: "100",
  clean: toOptionalString,
  comments: "Maximum number of results per page. Maximum: 1000. Default: 1000.",
});

export const getCompanyActivityInputs = {
  connection,
  startDate,
  endDate,
  fetchAll,
  next,
  limit: activityLimit,
};





const leaveRequestId = input({
  label: "ID",
  type: "string",
  required: false,
  placeholder: "Enter leave request ID",
  example: "lr_123456",
  clean: toOptionalString,
  comments: "The unique identifier of the leave request.",
});

const role = input({
  label: "Role",
  type: "string",
  required: false,
  placeholder: "Enter role",
  example: "Manager",
  clean: toOptionalString,
  comments: "The role associated with the leave request.",
});

const requestedBy = input({
  label: "Requested By",
  type: "string",
  required: false,
  placeholder: "Enter requester ID or email",
  example: "john.doe@example.com",
  clean: toOptionalString,
  comments: "The identifier or email of the person who requested the leave.",
});

const status = input({
  label: "Status",
  type: "string",
  required: false,
  placeholder: "Enter status",
  example: "APPROVED",
  clean: toOptionalString,
  comments: "The status of the leave request.",
});

const leaveStartDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  placeholder: "Enter start date (YYYY-MM-DD)",
  example: "2024-01-15",
  clean: toOptionalString,
  comments: "The start date of the leave in YYYY-MM-DD format.",
});

const leaveEndDate = input({
  label: "End Date",
  type: "string",
  required: false,
  placeholder: "Enter end date (YYYY-MM-DD)",
  example: "2024-01-19",
  clean: toOptionalString,
  comments: "The end date of the leave in YYYY-MM-DD format.",
});

const leavePolicy = input({
  label: "Leave Policy",
  type: "string",
  required: false,
  placeholder: "Enter leave policy ID or name",
  example: "PTO",
  clean: toOptionalString,
  comments: "The leave policy identifier or name.",
});

const processedBy = input({
  label: "Processed By",
  type: "string",
  required: false,
  placeholder: "Enter processor ID or email",
  example: "manager@example.com",
  clean: toOptionalString,
  comments:
    "The identifier or email of the person who processed the leave request.",
});

const from = input({
  label: "From",
  type: "string",
  required: false,
  placeholder: "Enter start date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: toOptionalString,
  comments:
    "Filter start date to capture leave requests that overlap with this date range.",
});

const to = input({
  label: "To",
  type: "string",
  required: false,
  placeholder: "Enter end date (YYYY-MM-DD)",
  example: "2024-12-31",
  clean: toOptionalString,
  comments:
    "Filter end date to capture leave requests that overlap with this date range.",
});

const leaveRequestIdRequired = input({
  label: "ID",
  type: "string",
  required: true,
  placeholder: "Enter leave request ID",
  example: "lr_123456",
  clean: util.types.toString,
  comments: "The unique identifier of the leave request to be processed.",
});

const leaveAction = input({
  label: "Action",
  type: "string",
  required: true,
  placeholder: "Select action",
  model: [
    { label: "Approve", value: "approve" },
    { label: "Decline", value: "decline" },
  ],
  clean: util.types.toString,
  comments: "The action to take on the leave request.",
});

export const getLeaveRequestsInputs = {
  connection,
  id: leaveRequestId,
  role,
  requestedBy,
  status,
  startDate: leaveStartDate,
  endDate: leaveEndDate,
  leavePolicy,
  processedBy,
  from,
  to,
};

export const processLeaveRequestsInputs = {
  connection,
  id: leaveRequestIdRequired,
  action: leaveAction,
};





const groupId = input({
  label: "Group ID",
  type: "string",
  required: true,
  placeholder: "Enter group ID",
  example: "12345",
  clean: util.types.toNumber,
  comments: "The unique identifier for the group in Rippling.",
});

const groupName = input({
  label: "Name",
  type: "string",
  required: false,
  placeholder: "Enter group name",
  example: "Engineering Team",
  clean: toOptionalString,
  comments: "The name of the group.",
});

const spokeId = input({
  label: "Spoke ID",
  type: "string",
  required: false,
  placeholder: "Enter spoke ID",
  example: "ext_group_123",
  clean: toOptionalString,
  comments:
    "The external unique identifier for the group entity in your application.",
});

const users = input({
  label: "Users",
  type: "string",
  required: false,
  placeholder: "Enter user IDs",
  example: "[123456, 789012]",
  clean: toOptionalString,
  comments: "An array of Rippling user IDs to include in the group.",
});

const version = input({
  label: "Version",
  type: "string",
  required: false,
  placeholder: "Enter version",
  example: "v1",
  clean: toOptionalString,
  comments: "The version identifier of the group.",
});

export const getGroupsInputs = {
  connection,
};

export const postGroupsInputs = {
  connection,
  name: groupName,
  spokeId,
  users,
};

export const putGroupsGroupIdInputs = {
  connection,
  groupId,
  name: { ...groupName, comments: "The name of the Group." },
  spokeId: { ...spokeId, comments: "The external identifier of the Group." },
  users: { ...users, comments: "The array of users within the Group." },
  version,
};

export const patchGroupsGroupIdInputs = {
  connection,
  groupId,
  name: { ...groupName, comments: "The name of the Group." },
  spokeId: { ...spokeId, comments: "The external identifier of the Group." },
  users: { ...users, comments: "The array of users within the Group." },
  version,
};

export const deleteGroupsGroupIdInputs = {
  connection,
  groupId,
};





const candidateName = input({
  label: "Name",
  type: "string",
  required: false,
  placeholder: "Enter candidate name",
  example: "Jane Smith",
  clean: toOptionalString,
  comments: "The candidate's full name.",
});

const email = input({
  label: "Email",
  type: "string",
  required: false,
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  clean: toOptionalString,
  comments: "The candidate's email address.",
});

const phoneNumber = input({
  label: "Phone Number",
  type: "string",
  required: false,
  placeholder: "Enter phone number",
  example: "+1-555-123-4567",
  clean: toOptionalString,
  comments: "The candidate's phone number.",
});

const jobTitle = input({
  label: "Job Title",
  type: "string",
  required: false,
  placeholder: "Enter job title",
  example: "Senior Software Engineer",
  clean: toOptionalString,
  comments: "The job title for the candidate's position.",
});

const candidateId = input({
  label: "Candidate ID",
  type: "string",
  required: false,
  placeholder: "Enter candidate ID",
  example: "cand_123456",
  clean: toOptionalString,
  comments:
    "The unique identifier of the candidate from your ATS (Applicant Tracking System).",
});

const candidateStartDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  placeholder: "Enter start date (YYYY-MM-DD)",
  example: "2024-03-01",
  clean: toOptionalString,
  comments: "The expected start date for the candidate in YYYY-MM-DD format.",
});

const department = input({
  label: "Department",
  type: "string",
  required: false,
  placeholder: "Enter department name",
  example: "Engineering",
  clean: toOptionalString,
  comments: "The name of the department the candidate will join.",
});

const salaryUnit = input({
  label: "Salary Unit",
  type: "string",
  required: false,
  placeholder: "Select salary unit",
  model: [
    { label: "HOUR", value: "HOUR" },
    { label: "DAY", value: "DAY" },
    { label: "WEEK", value: "WEEK" },
    { label: "MONTH", value: "MONTH" },
    { label: "PAY PERIOD", value: "PAY_PERIOD" },
  ],
  clean: toOptionalString,
  comments: "The frequency at which the candidate will be paid.",
});

const salaryPerUnit = input({
  label: "Salary Per Unit",
  type: "string",
  required: false,
  placeholder: "Enter salary amount",
  example: "75000.00",
  clean: toOptionalNumber,
  comments: "The monetary amount the candidate will be paid per salary unit.",
});

const signingBonus = input({
  label: "Signing Bonus",
  type: "string",
  required: false,
  placeholder: "Enter signing bonus amount",
  example: "10000.00",
  clean: toOptionalNumber,
  comments: "The one-time signing bonus amount given to the candidate.",
});

const equityShares = input({
  label: "Equity Shares",
  type: "string",
  required: false,
  placeholder: "Enter number of shares",
  example: "5000",
  clean: toOptionalNumber,
  comments: "The number of equity shares to be granted to the candidate.",
});

const currency = input({
  label: "Currency",
  type: "string",
  required: false,
  placeholder: "Enter currency code",
  example: "USD",
  clean: toOptionalString,
  comments:
    "The currency code in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format (e.g., USD, EUR, GBP).",
});

const employmentType = input({
  label: "Employment Type",
  type: "string",
  required: false,
  placeholder: "Select employment type",
  model: [
    { label: "CONTRACTOR", value: "CONTRACTOR" },
    { label: "SALARIED PT", value: "SALARIED_PT" },
    { label: "SALARIED FT", value: "SALARIED_FT" },
    { label: "HOURLY FT", value: "HOURLY_FT" },
    { label: "HOURLY PT", value: "HOURLY_PT" },
    { label: "TEMP", value: "TEMP" },
  ],
  clean: toOptionalString,
  comments: "The type of employment for the candidate.",
});

const attachments = input({
  label: "Attachments",
  type: "string",
  required: false,
  placeholder: "Enter attachment URLs or IDs",
  example: "https://example.com/resume.pdf",
  clean: toOptionalString,
  comments: "URLs or identifiers for attachments related to the candidate.",
});

export const postAtsCandidatesPushCandidateInputs = {
  connection,
  name: candidateName,
  email,
  phoneNumber,
  jobTitle,
  candidateId,
  startDate: candidateStartDate,
  department,
  salaryUnit,
  salaryPerUnit,
  signingBonus,
  equityShares,
  currency,
  employmentType,
  attachments,
};






const { debugRequest, ...httpInputsWithoutDebug } = httpClientInputs;

export const rawRequestV1Inputs = {
  connection,
  ...httpInputsWithoutDebug,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/companies/current), The base URL is already included (${BASE_URL_V1}). For example, to connect to ${BASE_URL_V1}/companies/current, only /companies/current is entered in this field.`,
    example: "/companies/current",
  },
};
