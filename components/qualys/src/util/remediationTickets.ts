import type { ClassicTicket, NormalizedTicket } from "../types";
import { ensureArray } from "./xml";
export const normalizeTicket = (ticket: ClassicTicket): NormalizedTicket => ({
  number: ticket.NUMBER,
  creationDatetime: ticket.CREATION_DATETIME,
  dueDatetime: ticket.DUE_DATETIME,
  state: ticket.CURRENT_STATE,
  status: ticket.CURRENT_STATUS,
  invalid: ticket.INVALID,
  assignee: ticket.ASSIGNEE,
  qid: ticket.DETECTION?.QID,
  severity: ticket.DETECTION?.SEVERITY,
  type: ticket.DETECTION?.TYPE,
  title: ticket.VULNINFO?.TITLE,
  category: ticket.VULNINFO?.CATEGORY,
  hosts: ensureArray(ticket.HOSTS?.HOST),
});
