import type { ClassicTicket, NormalizedTicket } from "../types";
import { ensureArray } from "./xml";
export const normalizeTicket = (ticket: ClassicTicket): NormalizedTicket => ({
  number: ticket.NUMBER,
  creationDatetime: ticket.CREATION_DATETIME,
  dueDatetime: ticket.DUE_DATETIME,
  state: ticket.CURRENT_STATE,
  invalid: ticket.INVALID,
  assigneeName: ticket.ASSIGNEE?.NAME,
  assigneeEmail: ticket.ASSIGNEE?.EMAIL,
  ip: ticket.DETECTION?.IP,
  dnsName: ticket.DETECTION?.DNSNAME,
  service: ticket.DETECTION?.SERVICE,
  qid: ticket.VULNINFO?.QID,
  severity: ticket.VULNINFO?.SEVERITY,
  type: ticket.VULNINFO?.TYPE,
  title: ticket.VULNINFO?.TITLE,
  cveIds: ensureArray(ticket.VULNINFO?.CVE_ID_LIST?.CVE_ID),
  vendorRefs: ensureArray(ticket.VULNINFO?.VENDOR_REF_LIST?.VENDOR_REF),
  firstFoundDatetime: ticket.STATS?.FIRST_FOUND_DATETIME,
  lastFoundDatetime: ticket.STATS?.LAST_FOUND_DATETIME,
  lastScanDatetime: ticket.STATS?.LAST_SCAN_DATETIME,
});
