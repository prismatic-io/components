import {
  attachmentSchema,
  createdIssueSchema,
  issueBeanSchema,
  issueSearchResultsPartialSchema,
  pageOfWorklogsSchema,
  transitionsSchema,
} from "./common";

export const addIssueAttachmentOutputSchema = {
  type: "array",
  items: attachmentSchema,
};

export const createIssueOutputSchema = createdIssueSchema;

export const getIssueOutputSchema = issueBeanSchema;

export const listIssueTransitionsOutputSchema = transitionsSchema;

export const listIssueWorklogsOutputSchema = pageOfWorklogsSchema;

export const listIssuesOutputSchema = issueSearchResultsPartialSchema;

export const searchIssuesOutputSchema = issueSearchResultsPartialSchema;

export const findIssueOutputSchema = {
  ...issueSearchResultsPartialSchema,
  type: ["object", "array"],
};
