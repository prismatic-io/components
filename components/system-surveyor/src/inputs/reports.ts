import { input, util } from "@prismatic-io/spectral";
import { connectionInput, siteId, surveyIds } from "./common";

const reportDefinitionId = input({
  label: "Report Definition ID",
  type: "string",
  required: true,
  comments:
    "The external ID of the report definition the new report belongs to.",
  placeholder: "Enter report definition ID",
  example: "d290f1ee-6c54-4b01-90e6-7e7f57220995",
  clean: util.types.toString,
});

const reportName = input({
  label: "Report Name",
  type: "string",
  required: true,
  comments: "The display name assigned to the generated report output.",
  placeholder: "Enter report name",
  example: "Monthly Security Report",
  clean: util.types.toString,
});

const reportType = input({
  label: "Report Type",
  type: "string",
  required: true,
  comments: "The format for the generated report.",
  placeholder: "Select report type",
  default: "xls",
  model: [
    { label: "Excel (XLS)", value: "xls" },
    { label: "JSON", value: "json" },
  ],
  clean: util.types.toString,
});

const isSiteReport = input({
  label: "Is Site Report",
  type: "boolean",
  required: true,
  comments:
    "Whether the report is generated at the site level. Set to true for site-level reports, false for survey-level reports.",
  default: "true",
  clean: util.types.toBool,
});

export const listReportsInputs = {
  ssvConnection: connectionInput,
};

export const scheduleReportInputs = {
  ssvConnection: connectionInput,
  reportDefinitionId,
  siteId,
  surveyIds,
  reportName,
  reportType,
  isSiteReport,
};
