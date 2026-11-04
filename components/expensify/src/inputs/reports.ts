import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { INPUT_SETTINGS_TYPES } from "../constants";
import {
  toOptionalObject,
  toOptionalString,
  valueListInputClean,
} from "../util";
import {
  connectionInput,
  employeeEmail,
  onFinish,
  policyIDList,
  policyId,
  type,
} from "./common";

const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "The name of a file generated from the exporter job.",
  placeholder: "Enter file name",
  example: "exporteba3c95b-f302-4d74-a41a-6127c9088551-5650745444954548.pdf",
  clean: util.types.toString,
});

const fileSystem = input({
  label: "File System",
  type: "string",
  required: false,
  comments:
    "The file system the exporter job stored the file on. Use the same value the file was generated with.",
  clean: toOptionalString,
  default: "integrationServer",
  model: [
    {
      label: "reconciliation",
      value: "reconciliation",
    },
    {
      label: "integrationServer",
      value: "integrationServer",
    },
  ],
});

const status = input({
  label: "Status",
  type: "string",
  required: true,
  comments:
    "The status to change the reports to. At the moment, only Reimbursed is supported. Only reports in the Approved status can be updated to Reimbursed. All other reports will be ignored.",
  placeholder: "Enter report status",
  example: "REIMBURSED",
  clean: util.types.toString,
  default: "REIMBURSED",
});

const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "Maximum number of reports to export.",
  placeholder: "Enter maximum number of reports",
  example: "10",
  clean: toOptionalString,
});

const test = input({
  label: "Test",
  type: "boolean",
  required: false,
  comments: "When true, the actions defined in On Finish are not executed.",
  clean: util.types.toBool,
  default: "false",
});

const expenses = input({
  label: "Expenses",
  type: "code",
  language: "json",
  comments: "The expenses to add to the report.",
  placeholder: "Enter expenses as JSON",
  example: JSON.stringify(
    [
      {
        date: "yyyy-mm-dd",
        currency: "USD",
        merchant: "Name of merchant",
        amount: 1234,
      },
      {
        date: "yyyy-mm-dd",
        currency: "CAD",
        merchant: "Name of merchant",
        amount: 2211,
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
  required: true,
});

const report = input({
  label: "Report",
  type: "code",
  language: "json",
  comments: "The report to create.",
  placeholder: "Enter report as JSON",
  example: JSON.stringify(
    {
      title: "Name of the report",
      fields: {
        reason_of_trip: "Business trip",
        employees: "3",
      },
    },
    null,
    2,
  ),
  clean: util.types.toObject,
  required: true,
});

const filters = input({
  label: "Filters",
  type: "code",
  language: "json",
  comments: "The filters to apply to the report list.",
  placeholder: "Enter filters as JSON",
  example: JSON.stringify(
    {
      type: "reportStatus",
      status: "REIMBURSED",
      filters: {
        reportIDList: "R006AseGxMka,R00bCluvcO4T",
      },
    },
    null,
    2,
  ),
  clean: toOptionalObject,
  required: false,
});

const startDate = input({
  label: "Start Date",
  type: "string",
  required: true,
  comments:
    "Filters out all reports submitted or created before the given date, whichever occurred last (inclusive). yyyy-mm-dd formatted date.",
  placeholder: "Enter start date (yyyy-mm-dd)",
  example: "2016-01-01",
  clean: util.types.toString,
  default: "2016-01-01",
});

const endDate = input({
  label: "End Date",
  type: "string",
  required: false,
  comments:
    "Filters out all reports submitted or created after the given date, whichever occurred last (inclusive). yyyy-mm-dd formatted date.",
  placeholder: "Enter end date (yyyy-mm-dd)",
  example: "2016-12-31",
  clean: toOptionalString,
  default: "2016-01-01",
});

const fileExtension = input({
  label: "File Extension",
  type: "string",
  required: true,
  comments:
    "Specifies the format of the generated report. Note: if the 'pdf' option is chosen, one PDF file will be generated for each report exported.",
  clean: util.types.toString,
  model: [
    {
      label: "csv",
      value: "csv",
    },
    {
      label: "pdf",
      value: "pdf",
    },
    {
      label: "xls",
      value: "xls",
    },
    {
      label: "xlsx",
      value: "xlsx",
    },
    {
      label: "txt",
      value: "txt",
    },
    {
      label: "json",
      value: "json",
    },
    {
      label: "xml",
      value: "xml",
    },
  ],
  default: "json",
});

const fileBasename = input({
  label: "File Basename",
  type: "string",
  required: false,
  comments:
    "The name of the generated file(s) will start with this value, and a random part will be added to make each filename globally unique. If not specified, the default value export is used.",
  placeholder: "Enter file basename",
  example: "expensify_export",
  clean: toOptionalString,
});

const includeFullPageReceiptsPdf = input({
  label: "Include Full Page Receipts PDF",
  type: "boolean",
  required: false,
  comments:
    "When true, generated PDFs include full page receipts. This parameter is used only if fileExtension contains pdf.",
  clean: util.types.toBool,
  default: "false",
});

const templateName = input({
  label: "Template",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The template parameter is used to format the Expensify data as you wish. It is based on the Freemarker language's syntax.",
  placeholder: "Enter Freemarker template",
  clean: util.types.toString,
  default: `
    <#if addHeader == true>
        Merchant,Original Amount,Category,Report number,Expense number<#lt>
    </#if>
    <#assign reportNumber = 1>
    <#assign expenseNumber = 1>
    <#list reports as report>
        <#list report.transactionList as expense>
            \${expense.merchant},<#t>
            <#-- note: expense.amount prints the original amount only -->
            \${expense.amount},<#t>
            \${expense.category},<#t>
            \${reportNumber},<#t>
            \${expenseNumber}<#lt>
            <#assign expenseNumber = expenseNumber + 1>
        </#list>
        <#assign reportNumber = reportNumber + 1>
    </#list>`,
});

const approvedAfter = input({
  label: "Approved After",
  type: "string",
  required: false,
  comments:
    "Filters out all reports approved before, or on, the given date. Only applies to reports that have been approved. yyyy-mm-dd formatted date.",
  placeholder: "Enter approval date (yyyy-mm-dd)",
  example: "2016-01-01",
  clean: toOptionalString,
});

const markAsExportedFilter = input({
  label: "Mark as Exported Label Filter",
  type: "string",
  required: false,
  comments:
    "Filters out reports that have already been exported with this label.",
  placeholder: "Enter export label",
  example: "Expensify Export",
  clean: toOptionalString,
});

const reportIdList = input({
  label: "Report ID List",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The IDs of the reports to get information for.",
  placeholder: "Enter report ID",
  example: "R006AseGxMka",
  clean: valueListInputClean,
});

export const createReportInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.REPORT,
    comments: "Specifies to the job that it has to create a report.",
  },
  employeeEmail,
  report,
  expenses,
  policyId,
};

export const downloadReportInputs = {
  connectionInput,
  fileName,
  fileSystem,
};

const exportReportAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes File Basename, Include Full Page Receipts PDF, Limit, and Test.",
  inputs: {
    fileBasename,
    includeFullPageReceiptsPdf,
    limit,
    test,
  },
});

export const exportReportInputs = {
  connectionInput,
  fileExtension,
  startDate: {
    ...startDate,
    required: false,
    clean: toOptionalString,
  },
  endDate: {
    ...endDate,
    required: false,
  },
  approvedAfter,
  markAsExportedFilter,
  policyIDList: {
    ...policyIDList,
    required: false,
  },
  reportIdList,
  additionalFields: exportReportAdditionalFields,
  status: {
    ...status,
    label: "Report State",
    comments:
      "The report state to filter on. Only reports in this state are exported.",
    required: false,
    clean: toOptionalString,
  },
  employeeEmail: {
    ...employeeEmail,
    required: false,
    clean: toOptionalString,
  },
  onFinish: {
    ...onFinish,
    example: JSON.stringify(
      [
        { actionName: "markAsExported", label: "Expensify Export" },
        {
          actionName: "email",
          recipients: "manager@domain.com,finances@domain.com",
          message: "Report is ready.",
        },
      ],
      null,
      2,
    ),
  },
  templateName,
};

export const updateReportStatusInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.REPORT_STATUS,
    comments:
      "Specifies to the job that it has to update the status of a list of reports.",
  },
  status,
  filters,
};
