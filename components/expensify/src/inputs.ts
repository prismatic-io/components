import { input, util } from "@prismatic-io/spectral";
import {
  jsonInputClean,
  valueListInputClean,
  valueListInputToStringClean,
} from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const type = input({
  label: "Type",
  type: "string",
  required: true,
  comments: "Specifies to the job that it has to get a policy summary list.",
  default: "policyList",
  clean: util.types.toString,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "The name of a file generated from the exporter job.",
  clean: util.types.toString,
});

export const fileSystem = input({
  label: "File System",
  type: "string",
  required: false,
  comments: "The name of a file generated from the exporter job.",
  clean: util.types.toString,
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

export const adminOnly = input({
  label: "Admin Only",
  type: "boolean",
  required: false,
  comments:
    "Whether or not to only get policies for which the user is an admin for.",
  default: "false",
  clean: util.types.toBool,
});

export const shouldFixApprovalChains = input({
  label: "Admin Only",
  type: "boolean",
  required: false,
  comments:
    "Dictates whether Expensify will automatically invite managers (submitsTo), managers’ managers, and so on to policies where they approve reports, if it is not their primary policy.",
  default: "true",
  clean: util.types.toBool,
});

export const dryRun = input({
  label: "Dry Run",
  type: "boolean",
  required: false,
  comments:
    "If set to true, employees will not actually be provisioned or updated. Use this for development.",
  default: "false",
  clean: util.types.toBool,
});

export const userEmail = input({
  label: "User Email",
  type: "string",
  required: false,
  comments:
    "Specifies the user to gather the policy list for. You must have been granted third-party access by that user/company domain beforehand.",
  clean: util.types.toString,
});

export const employeeEmail = input({
  label: "Employee Email",
  type: "string",
  required: true,
  comments: "The report will be created in that account.",
  clean: util.types.toString,
});

export const policyId = input({
  label: "Policy ID",
  type: "string",
  required: true,
  comments: "The report will be created in that policy.",
  example: "Any valid Expensify policy ID, owned or shared by the user",
  clean: util.types.toString,
});

export const ruleId = input({
  label: "Rule ID",
  type: "string",
  required: true,
  comments: "The rule to update.",
  example: "Any valid Expensify rule ID, owned or shared by the user",
  clean: util.types.toInt,
});

export const domain = input({
  label: "Domain",
  type: "string",
  required: true,
  comments: "The name of the domain to get the cards for.",
  clean: util.types.toString,
});

export const status = input({
  label: "Status",
  type: "string",
  required: true,
  comments:
    "The status to change the reports to. At the moment, only Reimbursed is supported. Only reports in the Approved status can be updated to Reimbursed. All other reports will be ignored.",
  clean: util.types.toString,
  default: "REIMBURSED",
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "Maximum number of reports to export.",
  clean: util.types.toString,
});

export const test = input({
  label: "Test",
  type: "boolean",
  required: false,
  comments: "If set to true, actions defined in onFinish will not be executed.",
  clean: util.types.toBool,
  default: "false",
});

export const reportState = input({
  label: "Report State",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The status to change the reports to. At the moment, only Reimbursed is supported. Only reports in the Approved status can be updated to Reimbursed. All other reports will be ignored.",
  clean: valueListInputToStringClean,
  model: [
    {
      label: "APPROVED",
      value: "APPROVED",
    },
    {
      label: "REIMBURSED",
      value: "REIMBURSED",
    },
    {
      label: "OPEN",
      value: "OPEN",
    },
    {
      label: "SUBMITTED",
      value: "SUBMITTED",
    },
    {
      label: "ARCHIVED",
      value: "ARCHIVED",
    },
  ],
});

export const policyName = input({
  label: "Policy Name",
  type: "string",
  required: true,
  comments: "The name of the policy to create.",
  clean: util.types.toString,
});

export const policyIDList = input({
  label: "Policy ID List",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "The IDs of the policies to get information for.",
  clean: valueListInputClean,
});

export const fields = input({
  label: "Fields",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "Specifies the fields of the policy to gather information for.",
  model: [
    {
      label: "categories",
      value: "categories",
    },
    {
      label: "reportFields",
      value: "reportFields",
    },
    {
      label: "tags",
      value: "tags",
    },
    {
      label: "tax",
      value: "tax",
    },
    {
      label: "employees",
      value: "employees",
    },
  ],
  clean: valueListInputClean,
});

export const plan = input({
  label: "Plan",
  type: "string",
  required: false,
  comments:
    "Specifies the plan of the policy. If not specified, the new policy will be created under the team plan.",
  model: [
    {
      label: "team",
      value: "team",
    },
    {
      label: "corporate",
      value: "corporate",
    },
  ],
  clean: util.types.toString,
});

export const setEmployeePrimaryPolicy = input({
  label: "Set Employee Primary Policy",
  type: "string",
  required: false,
  comments:
    "Specifies the policy to set as the primary policy for the employee. If not specified, the employee will not have a primary policy.",
  model: [
    {
      label: "none",
      value: "none",
    },
    {
      label: "new_employees",
      value: "new_employees",
    },
    {
      label: "all_employees",
      value: "all_employees",
    },
  ],
  default: "none",
  clean: util.types.toString,
});

export const expenses = input({
  label: "Expenses",
  type: "code",
  language: "json",
  comments: "The expenses to add to the report.",
  default: JSON.stringify(
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
  clean: jsonInputClean,
  required: true,
});

export const report = input({
  label: "Report",
  type: "code",
  language: "json",
  comments: "The report to create.",
  default: JSON.stringify(
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
  clean: jsonInputClean,
  required: true,
});

export const transactionList = input({
  label: "Transaction List",
  type: "code",
  language: "json",
  comments: "The transactions to add to the report.",
  default: JSON.stringify(
    [
      {
        created: "2016-01-01",
        currency: "USD",
        merchant: "Name of merchant 1",
        amount: 1234,
      },
      {
        created: "2016-01-21",
        currency: "EUR",
        merchant: "Name of merchant 2",
        amount: 2211,
        policyID: "E40D9B8DF456E233",
        tax: {
          rateID: "id_TAX_OPTION_16",
        },
      },
      {
        created: "2016-01-31",
        currency: "CAD",
        merchant: "Name of merchant 3",
        amount: 2211,
        reportID: "R006AseGxMka",
        tax: {
          rateID: "id_TAX_OPTION_16",
          amount: 600,
        },
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const actions = input({
  label: "Actions",
  type: "code",
  language: "json",
  comments: "The actions to perform on the expense rule.",
  default: JSON.stringify(
    {
      tag: "Tag Name",
      defaultBillable: true,
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const categories = input({
  label: "Categories",
  type: "code",
  language: "json",
  comments:
    "Replace or update the existing categories of the policy with the ones provided.",
  default: JSON.stringify(
    {
      action: "merge",
      data: [
        {
          name: "Category 1",
          enabled: true,
          payrollCode: "Payroll Code 1",
          glCode: "GL Code 1",
          commentHint: "Comment hint 1",
          areCommentsRequired: true,
          maxExpenseAmount: 2500,
        },
        {
          name: "Category 2",
          enabled: false,
        },
      ],
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const tags = input({
  label: "Tags",
  type: "code",
  language: "json",
  comments: "Replace the existing tags of the policy with the ones provided.",
  default: JSON.stringify(
    {
      data: [
        {
          name: "Tag",
          tags: [
            {
              name: "Tag 1",
              glCode: "Tag 1 GL Code",
            },
            {
              name: "Tag 2",
              enabled: false,
            },
          ],
        },
      ],
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const reportFields = input({
  label: "Report Fields",
  type: "code",
  language: "json",
  comments:
    "Replace or update the existing report fields of the policy with the ones provided.",
  default: JSON.stringify(
    {
      action: "merge",
      data: [
        {
          name: "Report field 1",
          type: "dropdown",
          values: ["value 1", "value 2", "value 3"],
        },
      ],
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const onFinish = input({
  label: "On Finish",
  type: "code",
  language: "json",
  comments:
    "You can configure the recipients list of email addresses that should receive a summary email of the changes made by the API.",
  default: JSON.stringify(
    [
      {
        actionName: "email",
        recipients: "admin1@domain.com,admin2@domain.com",
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const employees = input({
  label: "Employees",
  type: "code",
  language: "json",
  comments:
    "Replace or update the existing employees of the policy with the ones provided. If the employee does not exist, it will be created.",
  default: JSON.stringify(
    [
      {
        employeeEmail: "employee@domain.com",
        managerEmail: "manager@domain.com",
        policyID: "0123456789ABCDEF",
        employeeID: "12345",
        firstName: "John",
        lastName: "Doe",
        customField2: "ABC123",
        approvalLimit: 12300,
        overLimitApprover: "audit@domain.com",
        isTerminated: false,
        additionalPolicyIDs: ["ABCDEF0123456789", "456789ABCDEF0123"],
      },
      {
        employeeEmail: "manager@domain.com",
        managerEmail: "ceo@domain.com",
        policyID: "0123456789ABCDEF",
        employeeID: "34567",
        firstName: "Michael",
        lastName: "Scott",
        customField1: "ZZZ333",
        customField2: "BCD345",
        isTerminated: false,
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const filters = input({
  label: "Filters",
  type: "code",
  language: "json",
  comments: "The filters to apply to the report list.",
  default: JSON.stringify(
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
  clean: jsonInputClean,
  required: false,
});

export const startDate = input({
  label: "Start Date",
  type: "string",
  required: true,
  comments:
    "Filters out all reports submitted or created before the given date, whichever occurred last (inclusive). yyyy-mm-dd formatted date.",
  clean: util.types.toString,
  default: "2016-01-01",
});

export const endDate = input({
  label: "End Date",
  type: "string",
  required: false,
  comments:
    "Filters out all reports submitted or created before the given date, whichever occurred last (inclusive). yyyy-mm-dd formatted date.",
  clean: util.types.toString,
  default: "2016-01-01",
});

export const fileExtension = input({
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

export const fileBasename = input({
  label: "File Basename",
  type: "string",
  required: false,
  comments:
    "The name of the generated file(s) will start with this value, and a random part will be added to make each filename globally unique. If not specified, the default value export is use.",
  clean: util.types.toString,
});

export const includeFullPageReceiptsPdf = input({
  label: "Include Full Page Receipts PDF",
  type: "boolean",
  required: false,
  comments:
    "Specifies whether generated PDFs should include full page receipts. This parameter is used only if fileExtension contains pdf",
  clean: util.types.toBool,
  default: "false",
});

export const templateName = input({
  label: "Template",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The template parameter is used to format the Expensify data as you wish. It is based on the Freemarker language's syntax.",
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

export const approvedAfter = input({
  label: "Approved After",
  type: "string",
  required: false,
  placeholder: "yyyy-mm-dd",
  example: "2016-01-01",
});

export const markAsExportedFilter = input({
  label: "Mark as Exported Label Filter",
  type: "string",
  required: false,
  placeholder: "Expensify Export",
});

export const reportIdList = input({
  label: "Report ID List",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The IDs of the reports to get information for.",
  clean: valueListInputClean,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});
