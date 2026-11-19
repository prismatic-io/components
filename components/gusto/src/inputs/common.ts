import { input, util } from "@prismatic-io/spectral";
import { API_VERSION } from "../constants";
import { toObject } from "../util";

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

export const paginationPageInput = input({
  label: "Pagination Page",
  required: false,
  type: "string",
  placeholder: "Enter page number",
  comments:
    "Which page of results to fetch. See [Gusto API documentation](https://docs.gusto.com/app-integrations/docs/pagination) for more information.",
  clean: (value) => util.types.toInt(value) || undefined,
});

export const companyIdInput = input({
  label: "Company ID",
  required: true,
  type: "string",
  placeholder: "Enter company ID",
  comments: "A UUID representing a company.",
  example: "00000000-0000-0000-0000-000000000000",
  dataSource: "selectCompany",
  clean: util.types.toString,
});

export const employeeIdInput = input({
  label: "Employee ID",
  required: true,
  type: "string",
  placeholder: "Enter employee ID",
  comments: "A UUID representing an employee.",
  example: "00000000-0000-0000-0000-000000000000",
  dataSource: "selectEmployee",
  clean: util.types.toString,
});

export const payScheduleIdInput = input({
  label: "Pay Schedule ID",
  required: true,
  type: "string",
  placeholder: "Enter pay schedule ID",
  comments: "A UUID representing a pay schedule.",
  example: "00000000-0000-0000-0000-000000000000",
  dataSource: "selectPaySchedule",
  clean: util.types.toString,
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

export const apiVersionInput = input({
  label: "API Version",
  required: true,
  type: "string",
  placeholder: "Enter API version",
  comments: "The Gusto API version sent in the X-Gusto-API-Version header.",
  example: API_VERSION,
  default: API_VERSION,
  clean: util.types.toString,
});
