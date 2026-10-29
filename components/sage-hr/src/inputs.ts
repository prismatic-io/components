import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "./constants";
import { jsonInputClean, valueListInputClean } from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const employee_id = input({
  label: "Employee ID",
  type: "string",
  clean: util.types.toString,
  comments: "The ID of the employee",
  required: true,
  example: "12323",
  dataSource: "selectEmployee",
});

export const employee_ids = input({
  label: "Employee IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  comments:
    "Employee Identifier; also accepts and array of integers to share with multiple employees",
  default: ["000xxx"],
  clean: valueListInputClean,
  example: "123213",
});

export const custom_field_id = input({
  label: "Custom Field ID",
  type: "string",
  clean: util.types.toString,
  comments: "Custom field ID",
  required: true,
  example: "123",
});

export const document_id = input({
  label: "Document ID",
  type: "string",
  clean: util.types.toString,
  comments: "Document ID",
  required: true,
  example: "123",
  dataSource: "selectDocument",
});

export const project_id = input({
  label: "Project ID",
  type: "string",
  clean: util.types.toString,
  comments: "Id of the project",
  required: true,
  example: "123",
  dataSource: "projects",
});

export const category_id = input({
  label: "Category ID",
  type: "string",
  clean: util.types.toString,
  comments: "Optional ID of the document category to filter by.",
  required: false,
  example: "123",
});

export const location_id = input({
  label: "Location ID",
  type: "string",
  clean: util.types.toString,
  comments: "The ID of the location",
  required: false,
  example: "12323",
});

export const team_id = input({
  label: "Team ID",
  type: "string",
  clean: util.types.toString,
  comments: "The ID of the team",
  required: false,
  example: "12323",
  dataSource: "teams",
});

export const leader_id = input({
  label: "Leader ID",
  type: "string",
  clean: util.types.toString,
  comments: "The ID of the leader",
  required: false,
  example: "12323",
  dataSource: "selectEmployee",
});

export const position_id = input({
  label: "Position ID",
  type: "string",
  clean: util.types.toString,
  comments: "The ID of the position",
  required: false,
  example: "12323",
  dataSource: "positions",
});

export const employee_number = input({
  label: "Employee Number",
  type: "string",
  clean: util.types.toString,
  comments: "The employee number",
  required: false,
  example: "12323",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results. The Page input is ignored when this is enabled.",
  required: false,
  default: "false",
});

export const page = input({
  label: "Page",
  type: "string",
  clean: util.types.toString,
  comments: "The page number to return",
  required: false,
  example: "2",
});

export const team_history = input({
  label: "Team History",
  type: "boolean",
  clean: util.types.toBool,
  comments: "Whether to return the team history",
  required: false,
  example: "false",
});

export const employment_status_history = input({
  label: "Employment Status History",
  type: "boolean",
  clean: util.types.toBool,
  comments: "Whether to return the employment status history",
  required: false,
  example: "false",
});

export const position_history = input({
  label: "Position History",
  type: "boolean",
  clean: util.types.toBool,
  comments: "Whether to return the position history",
  required: false,
  example: "false",
});

export const email = input({
  label: "Email",
  type: "string",
  clean: util.types.toString,
  comments: "Email address of the employee",
  required: true,
  example: "test@test.es",
});

export const first_name = input({
  label: "First Name",
  type: "string",
  clean: util.types.toString,
  comments: "First name of the employee",
  required: true,
  example: "John",
});

export const last_name = input({
  label: "Last Name",
  type: "string",
  clean: util.types.toString,
  comments: "Last name of the employee",
  required: true,
  example: "Locke",
});

export const work_start_date = input({
  label: "Work Start Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "Employees work start date, format: YYYY-MM-DD, leave empty to use todays date",
  required: false,
  example: "2020-01-01",
});

export const send_email = input({
  label: "Send Email",
  type: "boolean",
  clean: util.types.toBool,
  comments: "'true' to send welcome email to employee",
  required: false,
  example: "false",
});

export const date_of_birth = input({
  label: "Date of Birth",
  type: "string",
  clean: util.types.toString,
  comments: "Employees date of birth, format: YYYY-MM-DD",
  required: false,
  example: "2020-01-01",
});

export const gender = input({
  label: "Gender",
  type: "string",
  clean: util.types.toString,
  comments: "Employees gender, Must be one of: Male, Female, Other",
  model: [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Other",
      value: "Other",
    },
  ],
  required: false,
  example: "Male",
});

export const marital_status = input({
  label: "Marital Status",
  type: "string",
  clean: util.types.toString,
  comments:
    "Employees marital status, Must be one of: Married, Single, Divorced, Widower, In a relationship, Other",
  model: [
    {
      label: "Married",
      value: "Married",
    },
    {
      label: "Single",
      value: "Single",
    },
    {
      label: "Divorced",
      value: "Divorced",
    },
    {
      label: "Widower",
      value: "Widower",
    },
    {
      label: "In a relationship",
      value: "In a relationship",
    },
    {
      label: "Other",
      value: "Other",
    },
  ],
  required: false,
  example: "Single",
});

export const nationality = input({
  label: "Nationality",
  type: "string",
  clean: util.types.toString,
  comments: "Employees nationalty in long form, example: Canadian",
  required: false,
  example: "Canadian",
});

export const country = input({
  label: "Country",
  type: "string",
  clean: util.types.toString,
  comments: "Employees country two character ISO code",
  required: false,
  example: "US",
});

export const state = input({
  label: "State",
  type: "string",
  clean: util.types.toString,
  comments: "Employees address: state",
  required: false,
  example: "Florida",
});

export const post_code = input({
  label: "Post Code",
  type: "string",
  clean: util.types.toString,
  comments: "Employees address: zip or postal code",
  required: false,
  example: "32003",
});

export const street_first = input({
  label: "Street First",
  type: "string",
  clean: util.types.toString,
  comments: "Employees address first line",
  required: false,
  example: "First street",
});

export const street_second = input({
  label: "Street Second",
  type: "string",
  clean: util.types.toString,
  comments: "Employees address second line",
  required: false,
  example: "Second street",
});

export const city = input({
  label: "City",
  type: "string",
  clean: util.types.toString,
  comments: "Employees address city",
  required: false,
  example: "Jacksonville",
});

export const position_title = input({
  label: "Position Title",
  type: "string",
  clean: util.types.toString,
  comments: "Employees position",
  required: false,
  example: "Engineer",
});

export const home_phone = input({
  label: "Home Phone",
  type: "string",
  clean: util.types.toString,
  comments: "Home phone number",
  required: false,
  example: "+1 123 456 789",
});

export const work_phone = input({
  label: "Work Phone",
  type: "string",
  clean: util.types.toString,
  comments: "Work phone number",
  required: false,
  example: "+1 123 456 789",
});

export const mobile_phone = input({
  label: "Mobile Phone",
  type: "string",
  clean: util.types.toString,
  comments: "Mobile phone number",
  required: false,
  example: "+1 123 456 789",
});

export const personal_identification_number = input({
  label: "Personal Identification Number",
  type: "string",
  clean: util.types.toString,
  comments: "Personal identification number",
  required: false,
  example: "1123456789",
});

export const tax_number = input({
  label: "Tax Number",
  type: "string",
  clean: util.types.toString,
  comments: "Tax Number",
  required: false,
  example: "1123456789",
});

export const approver_ids = input({
  label: "Approver IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "List of approver IDs.",
  default: ["000xxx"],
  clean: valueListInputClean,
});

export const selected_leave_types = input({
  label: "Selected Leave Types",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Selected leave types.",
  default: ["000xxx"],
  clean: valueListInputClean,
});

export const value = input({
  label: "Custom Field Value",
  type: "string",
  clean: util.types.toString,
  comments: "Custom field Value",
  required: true,
  example: "123",
});

export const date = input({
  label: "Last Working Day",
  type: "string",
  clean: util.types.toString,
  comments: "Last working day; format: YYYY-MM-DD",
  required: false,
  example: "2020-01-01",
});

export const termination_reason_id = input({
  label: "Termination Reason ID",
  type: "string",
  clean: util.types.toInt,
  comments: "Termination reason ID",
  required: true,
  example: "123",
});

export const comments = input({
  label: "Comments",
  type: "string",
  clean: util.types.toString,
  comments: "Comments",
  required: false,
  example: "No comments",
});

export const start_fresh = input({
  label: "Start Fresh",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "This parameter is used to start the employee record clean, resetting the employee's leave balances.",
  required: false,
  example: "No comments",
});

export const from = input({
  label: "From Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "If not specified defaults to beginning of current month. Format: YYYY-MM-DD",
  required: false,
  example: "2018-05-20",
});

export const to = input({
  label: "To Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "If not specified defaults to end of current month. Days between from date and to date must be less than 65. If you need info for larger period of time make multiple requests. Format: YYYY-MM-DD",
  required: false,
  example: "2018-05-20",
});

export const type = input({
  label: "Type",
  type: "string",
  clean: util.types.toString,
  comments: "Time off request type",
  model: [
    {
      label: "Single",
      value: "single",
    },
    {
      label: "Multi",
      value: "multi",
    },
  ],
  required: false,
  example: "Multi",
});

export const time_off_policy_id = input({
  label: "Time Off Policy ID",
  type: "string",
  clean: util.types.toInt,
  comments: "Time off policy ID",
  required: false,
  example: "123",
});

export const replacement_id = input({
  label: "Replacement ID",
  type: "string",
  clean: util.types.toInt,
  comments: "Time off policy ID",
  required: false,
  example: "123",
});

export const part_of_day = input({
  label: "Part of Day",
  type: "string",
  clean: util.types.toString,
  comments: "Part of day",
  model: [
    {
      label: "all_day",
      value: "all_day",
    },
    {
      label: "first_part_of_day",
      value: "first_part_of_day",
    },
    {
      label: "second_part_of_day",
      value: "second_part_of_day",
    },
    {
      label: "specific_timespan",
      value: "specific_timespan",
    },
  ],
  required: false,
  example: "specific_timespan",
});

export const hours = input({
  label: "Hours",
  type: "string",
  clean: util.types.toInt,
  comments:
    "required if type is single & part_of_day is first_part_of_day or second_part_of_day",
  required: false,
  example: "2",
});

export const details = input({
  label: "Details",
  type: "string",
  clean: util.types.toString,
  comments: "required based on policy settings",
  required: false,
  example: "2",
});

export const fileInput = input({
  label: "File",
  type: "data",
  required: true,
  clean: util.types.toData,
  comments: "The file to upload.",
  example: "Some binary file",
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "Document description.",
  example: "Document description",
});

export const notify = input({
  label: "Notify",
  type: "boolean",
  required: false,
  clean: util.types.toString,
  comments: "'true' to notify employee by email",
  example: "true",
});

export const source = input({
  label: "Source",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "Source of the document",
  example: "API",
  default: "API",
});

export const shared_with_everyone = input({
  label: "Shared With Everyone",
  type: "boolean",
  required: false,
  clean: util.types.toString,
  comments: "'true' to share with all employees",
  example: "true",
});

export const shared_with_team_manager = input({
  label: "Shared With Team Manager",
  type: "boolean",
  required: false,
  clean: util.types.toString,
  comments: "'true' to share with all team managers",
  example: "true",
});

export const shared_with_direct_manager = input({
  label: "Shared With Direct Manager",
  type: "boolean",
  required: false,
  clean: util.types.toString,
  comments: "'true' to share with all direct manager",
  example: "true",
});

export const status = input({
  label: "Status",
  type: "string",
  clean: util.types.toString,
  comments: "Status of the document",
  model: [
    {
      label: "empty",
      value: "empty",
    },
    {
      label: "valid",
      value: "valid",
    },
    {
      label: "expired",
      value: "expired",
    },
  ],
  required: false,
  example: "valid",
});

export const right_to_work_document_type = input({
  label: "Right to Work Document Type",
  type: "string",
  clean: util.types.toString,
  comments: "Right to work document type",
  model: [
    {
      label: "residence_card",
      value: "residence_card",
    },
    {
      label: "national_id",
      value: "national_id",
    },
    {
      label: "passport",
      value: "passport",
    },
    {
      label: "other",
      value: "other",
    },
  ],
  required: false,
  example: "valid",
});

export const right_to_work_document_number = input({
  label: "Right to Work Document Number",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "Right to work document number",
  example: "123213",
});

export const expires = input({
  label: "Expires",
  type: "boolean",
  required: false,
  clean: util.types.toString,
  comments: "if 'true' expiration_date is also required",
  example: "true",
});

export const expiration_date = input({
  label: "Expiration Date",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "Expiration date of the document, format: YYYY-MM-DD",
  example: "2020-01-01",
});

export const override = input({
  label: "Override",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "'true' if override provided days clocked entries",
  example: "true",
});

export const clocked_time = input({
  label: "Clocked Time",
  type: "code",
  language: "json",
  comments:
    "Clocked time entries for the day. If override is true, this will override the existing entries.",
  example: JSON.stringify({
    "YYYY/MM/DD": {
      employee_id: [
        {
          clock_in: "",
          clock_out: "",
        },
      ],
    },
  }),
  clean: jsonInputClean,
  required: true,
});

export const projects = input({
  label: "Projects",
  type: "code",
  language: "json",
  comments: "An array of projects.",
  example: JSON.stringify([
    {
      name: "",
      code: "",
      start_date: "",
      end_date: "",
      limit_total_hours: false,
      max_limit_total_hours: -100000000,
    },
  ]),
  clean: jsonInputClean,
  required: true,
});

export const project_name = input({
  label: "Project Name",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "Name of the project",
  example: "New Project",
});

export const project_code = input({
  label: "Project Code",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "Code of the project",
  example: "123",
});

export const limit_total_hours = input({
  label: "Limit Total Hours",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "Activate the limit of hours",
  example: "true",
});

export const max_limit_total_hours = input({
  label: "Max Limit Total Hours",
  type: "string",
  required: false,
  clean: util.types.toInt,
  comments: "The limit number of hours",
  example: "123",
});

export const file_name = input({
  label: "File Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The name of the file",
  example: "filename.jpg",
});

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The type of resource to poll for new records.",
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records on First Run",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "If true, the first poll will return all existing records as new. If false, the first run seeds state without triggering.",
  clean: util.types.toBool,
});
