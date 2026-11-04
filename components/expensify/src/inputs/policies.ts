import { input, util } from "@prismatic-io/spectral";
import { INPUT_SETTINGS_TYPES } from "../constants";
import {
  toOptionalBool,
  toOptionalObject,
  toOptionalString,
  valueListInputClean,
} from "../util";
import { connectionInput, policyIDList, policyId, type } from "./common";

const adminOnly = input({
  label: "Admin Only",
  type: "boolean",
  required: false,
  comments: "When true, only returns the policies the user is an admin of.",
  default: "false",
  clean: toOptionalBool,
});

const userEmail = input({
  label: "User Email",
  type: "string",
  required: false,
  comments:
    "Specifies the user to gather the policy list for. Third-party access must have been granted by that user/company domain beforehand.",
  placeholder: "Enter user email address",
  example: "employee@domain.com",
  clean: toOptionalString,
});

const policyName = input({
  label: "Policy Name",
  type: "string",
  required: true,
  comments: "The name of the policy to create.",
  placeholder: "Enter policy name",
  example: "Marketing Team",
  clean: util.types.toString,
});

const fields = input({
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

const plan = input({
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
  clean: toOptionalString,
});

const categories = input({
  label: "Categories",
  type: "code",
  language: "json",
  comments:
    "Replace or update the existing categories of the policy with the ones provided.",
  placeholder: "Enter categories as JSON",
  example: JSON.stringify(
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
  clean: toOptionalObject,
  required: false,
});

const tags = input({
  label: "Tags",
  type: "code",
  language: "json",
  comments: "Replace the existing tags of the policy with the ones provided.",
  placeholder: "Enter tags as JSON",
  example: JSON.stringify(
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
  clean: toOptionalObject,
  required: false,
});

const reportFields = input({
  label: "Report Fields",
  type: "code",
  language: "json",
  comments:
    "Replace or update the existing report fields of the policy with the ones provided.",
  placeholder: "Enter report fields as JSON",
  example: JSON.stringify(
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
  clean: toOptionalObject,
  required: false,
});

export const createPolicyInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.POLICY,
    comments: "Specifies to the job that it has to create a policy.",
  },
  policyName,
  plan,
};

export const getPolicyInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.POLICY,
    comments:
      "Specifies to the job that it has to get information specific to policies.",
  },
  policyIDList,
  fields,
  userEmail,
};

export const listPoliciesInputs = {
  connectionInput,
  type,
  adminOnly,
  userEmail,
};

export const updatePolicyInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.POLICY,
    comments: "Specifies to the job that it has to update a policy.",
  },
  policyId,
  policyIDList: {
    ...policyIDList,
    required: false,
  },
  categories,
  tags,
  reportFields,
};
