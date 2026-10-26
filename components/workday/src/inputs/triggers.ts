import { input, util } from "@prismatic-io/spectral";
import {
  cleanValueListInput,
  lookBackDateClean,
  overlapMinutesClean,
} from "../util";
import { connection, reportUrl } from "./common";
import { reportPrompts, wqlTenant } from "./reports";
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record from that date on once, with no inputs ignored.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const watermarkPrompt = input({
  label: "Watermark Prompt",
  comments:
    "The XML alias of the report prompt that receives the window start. Build the report so this prompt keeps only rows entered or changed on or after that time.",
  type: "string",
  example: "Updated_Since",
  placeholder: "Enter watermark prompt",
  required: true,
  clean: util.types.toString,
});
const watermarkFormat = input({
  label: "Watermark Format",
  comments:
    "The format of the value sent to the Watermark Prompt. Match the prompt's type in the report.",
  type: "string",
  required: true,
  default: "dateTime",
  model: [
    { label: "Date-Time (YYYY-MM-DDTHH:MM:SSZ)", value: "dateTime" },
    { label: "Date (YYYY-MM-DD)", value: "date" },
  ],
  clean: util.types.toString,
});
const raasRecordKeyField = input({
  label: "Record Key Field",
  comments:
    "The Report_Entry column, by XML alias, that identifies a row, such as an employee ID. Used to detect rows already delivered.",
  type: "string",
  example: "Employee_ID",
  placeholder: "Enter record key field",
  required: true,
  clean: util.types.toString,
});
const wqlPollingQuery = input({
  label: "Query",
  comments:
    "The WQL query to run. Must contain {{lastPolledAt}}, which is replaced with the window start as a quoted UTC date-time literal. Compare it against a date-time field that moves when a row is entered or changed, following the pattern WHERE <dateTimeField> >= {{lastPolledAt}}. Which fields exist, and their types, depend on the data source.",
  type: "text",
  example:
    "SELECT workdayID, <dateTimeField> FROM <dataSource> WHERE <dateTimeField> >= {{lastPolledAt}}",
  placeholder: "Enter query",
  required: true,
  clean: util.types.toString,
});
const wqlRecordKeyField = input({
  label: "Record Key Field",
  comments:
    "The field that identifies a row, such as workdayID. Must be selected in the query. Used to detect rows already delivered.",
  type: "string",
  example: "workdayID",
  placeholder: "Enter record key field",
  required: true,
  clean: util.types.toString,
});
const wqlDateField = input({
  label: "Date Field",
  comments:
    "The name of the date or date-time column in each returned row that the query compares to {{lastPolledAt}}, such as approvalDate. Must be selected in the query and must be the same field the WHERE clause compares to {{lastPolledAt}} with >=. The trigger continues from the newest value of this field it has seen.",
  type: "string",
  example: "approvalDate",
  placeholder: "Enter date field",
  required: true,
  clean: util.types.toString,
});
const wqlOverlapMinutes = input({
  label: "Overlap Minutes",
  comments:
    "The number of minutes each recurrence starts before the newest Date Field value already seen, to catch rows saved late with an older date, such as backdated transactions. Leave empty when the Date Field is a value Workday sets when the row is saved or changed. Rows already delivered are skipped.",
  type: "string",
  example: "60",
  placeholder: "Enter overlap in minutes",
  required: false,
  clean: overlapMinutesClean,
});
const businessProcess = input({
  label: "Business Process",
  comments:
    "Workday IDs of the business process types whose event steps are included. Leave empty to include all.",
  type: "string",
  collection: "valuelist",
  example: "3cb0fdb7e3354a05b0a5e1c8a9d0f4b2",
  placeholder: "Enter business process ID",
  required: false,
  clean: cleanValueListInput,
});
const stepType = input({
  label: "Step Type",
  comments:
    "Workday IDs of the step types to include. Leave empty to include all.",
  type: "string",
  collection: "valuelist",
  example: "d9e4223e446c11de98360015c5e6daf6",
  placeholder: "Enter step type ID",
  required: false,
  clean: cleanValueListInput,
});
export const raasReportPollingInputs = {
  connection,
  reportUrl: {
    ...reportUrl,
    comments:
      "The report URL from Web Services > View URLs for the report in Workday. Must be on the same host as the connection. The trigger always requests format=json.",
  },
  watermarkPrompt,
  watermarkFormat,
  recordKeyField: raasRecordKeyField,
  lookBackDate,
  prompts: {
    ...reportPrompts,
    comments:
      "Static prompt values for the report as key-value pairs, sent on every recurrence. Keys are the prompt XML aliases. Do not include the Watermark Prompt.",
  },
};
export const wqlQueryPollingInputs = {
  connection,
  query: wqlPollingQuery,
  recordKeyField: wqlRecordKeyField,
  dateField: wqlDateField,
  overlapMinutes: wqlOverlapMinutes,
  lookBackDate,
  tenant: wqlTenant,
};
export const newEventStepsPollingInputs = {
  connection,
  lookBackDate,
  businessProcess,
  stepType,
};
