import { addIssueAttachment } from "./addIssueAttachment";
import { createIssue } from "./createIssue";
import { deleteIssue } from "./deleteIssue";
import { downloadAttachment } from "./downloadAttachment";
import { findIssue } from "./findIssue";
import { getIssue } from "./getIssue";
import { listIssueAttachments } from "./listIssueAttachments";
import { listIssues } from "./listIssues";
import { listIssueTransitions } from "./listIssueTransitions";
import { listIssueWorklogs } from "./listIssueWorklogs";
import { searchIssues } from "./searchIssues";
import { transitionIssue } from "./transitionIssue";
import { updateIssue } from "./updateIssue";

export default {
  searchIssues,
  getIssue,
  findIssue,
  listIssues,
  createIssue,
  updateIssue,
  deleteIssue,
  downloadAttachment,
  listIssueAttachments,
  listIssueTransitions,
  listIssueWorklogs,
  transitionIssue,
  addIssueAttachment,
};
