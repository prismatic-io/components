export interface ClassicTicket {
  NUMBER?: string;
  CREATION_DATETIME?: string;
  DUE_DATETIME?: string;
  CURRENT_STATE?: string;
  CURRENT_STATUS?: string;
  INVALID?: string;
  ASSIGNEE?: string;
  DETECTION?: {
    QID?: string;
    SEVERITY?: string;
    TYPE?: string;
  };
  VULNINFO?: {
    TITLE?: string;
    CATEGORY?: string;
  };
  HOSTS?: {
    HOST?:
      | {
          IP?: string;
          ID?: string;
        }
      | {
          IP?: string;
          ID?: string;
        }[];
  };
  STATS?: Record<string, unknown>;
  HISTORY_LIST?: Record<string, unknown>;
  DETAILS?: Record<string, unknown>;
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
  status?: string;
  invalid?: string;
  assignee?: string;
  qid?: string;
  severity?: string;
  type?: string;
  title?: string;
  category?: string;
  hosts: unknown[];
}
export interface TicketEditResponse {
  BATCH_RETURN?: {
    RESPONSE?: {
      BATCH_LIST?: {
        BATCH?:
          | {
              TEXT?: string;
            }[]
          | {
              TEXT?: string;
            };
      };
    };
  };
}
