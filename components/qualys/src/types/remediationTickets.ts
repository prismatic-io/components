interface ClassicTicketAssignee {
  NAME?: string;
  EMAIL?: string;
  LOGIN?: string;
}
interface ClassicTicketDetection {
  IP?: string;
  DNSNAME?: string;
  NBHNAME?: string;
  SERVICE?: string;
}
interface ClassicTicketStats {
  FIRST_FOUND_DATETIME?: string;
  LAST_FOUND_DATETIME?: string;
  LAST_SCAN_DATETIME?: string;
  TIMES_FOUND?: string;
  TIMES_NOT_FOUND?: string;
  LAST_OPEN_DATETIME?: string;
}
interface ClassicTicketVulnInfo {
  TITLE?: string;
  TYPE?: string;
  QID?: string;
  SEVERITY?: string;
  STANDARD_SEVERITY?: string;
  CVE_ID_LIST?: {
    CVE_ID?: string | string[];
  };
  VENDOR_REF_LIST?: {
    VENDOR_REF?: string | string[];
  };
}
export interface ClassicTicket {
  NUMBER?: string;
  CREATION_DATETIME?: string;
  DUE_DATETIME?: string;
  CURRENT_STATE?: string;
  INVALID?: string;
  ASSIGNEE?: ClassicTicketAssignee;
  DETECTION?: ClassicTicketDetection;
  STATS?: ClassicTicketStats;
  VULNINFO?: ClassicTicketVulnInfo;
  HISTORY_LIST?: Record<string, unknown>;
}
export interface TicketListResponse {
  REMEDIATION_TICKETS?: {
    TICKET_LIST?: {
      TICKET?: ClassicTicket | ClassicTicket[];
    };
    TRUNCATION?: {
      _?: string;
      $?: {
        last: string;
      };
    };
  };
}
export interface NormalizedTicket {
  number?: string;
  creationDatetime?: string;
  dueDatetime?: string;
  state?: string;
  invalid?: string;
  assigneeName?: string;
  assigneeEmail?: string;
  ip?: string;
  dnsName?: string;
  service?: string;
  qid?: string;
  severity?: string;
  type?: string;
  title?: string;
  cveIds: string[];
  vendorRefs: string[];
  firstFoundDatetime?: string;
  lastFoundDatetime?: string;
  lastScanDatetime?: string;
}
