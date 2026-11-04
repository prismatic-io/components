import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { INPUT_SETTINGS_TYPES } from "../constants";
import { toOptionalBool, toOptionalObject, toOptionalString } from "../util";
import { connectionInput, onFinish, type } from "./common";

const dryRun = input({
  label: "Dry Run",
  type: "boolean",
  required: false,
  comments:
    "When true, employees are not actually provisioned or updated. Use this for development.",
  default: "false",
  clean: toOptionalBool,
});

const shouldFixApprovalChains = input({
  label: "Fix Approval Chains",
  type: "boolean",
  required: false,
  comments:
    "When true, Expensify automatically invites managers (submitsTo), managers’ managers, and so on to policies where they approve reports, if it is not their primary policy.",
  default: "true",
  clean: toOptionalBool,
});

const setEmployeePrimaryPolicy = input({
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
  clean: toOptionalString,
});

const employees = input({
  label: "Employees",
  type: "code",
  language: "json",
  comments:
    "Replace or update the existing employees of the policy with the ones provided. If the employee does not exist, it will be created.",
  placeholder: "Enter employees as JSON",
  example: JSON.stringify(
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
  clean: toOptionalObject,
  required: false,
});

const provisioningOptions = structuredObjectInput({
  label: "Provisioning Options",
  required: false,
  comments:
    "Options that control how the employee update is applied: dry run, primary policy assignment, and approval chain fixes.",
  inputs: {
    dryRun,
    setEmployeePrimaryPolicy,
    shouldFixApprovalChains,
  },
});

export const updateEmployeeInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.EMPLOYEES,
    comments: "Specifies to the job that it has to update an employee",
  },
  employees,
  provisioningOptions,
  onFinish,
};
