import {
  fieldDetailsSchema,
  issueLinkTypesSchema,
  issueTypeDetailsSchema,
  pageBeanPrioritySchema,
  pageOfStatusesSchema,
  searchAndReconcileResultsSchema,
} from "./common";

export const queryV3OutputSchema = searchAndReconcileResultsSchema;

export const getStatusListOutputSchema = pageOfStatusesSchema;

export const listIssueCustomFieldsOutputSchema = {
  type: "array",
  items: fieldDetailsSchema,
};

export const listIssueFieldsOutputSchema = {
  type: "array",
  items: fieldDetailsSchema,
};

export const listIssueLinkTypesOutputSchema = issueLinkTypesSchema;

export const listIssueTypesOutputSchema = {
  type: "array",
  items: issueTypeDetailsSchema,
};

export const listPrioritiesOutputSchema = pageBeanPrioritySchema;
