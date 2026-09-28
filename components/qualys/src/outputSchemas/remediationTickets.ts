export const listRemediationTicketsOutputSchema = {
  type: "object" as const,
  properties: {
    tickets: {
      type: "array",
      items: {
        type: "object",
        properties: {
          number: { type: "string" },
          creationDatetime: { type: "string" },
          dueDatetime: { type: "string" },
          state: { type: "string" },
          invalid: { type: "string" },
          assigneeName: { type: "string" },
          assigneeEmail: { type: "string" },
          ip: { type: "string" },
          dnsName: { type: "string" },
          service: { type: "string" },
          qid: { type: "string" },
          severity: { type: "string" },
          type: { type: "string" },
          title: { type: "string" },
          cveIds: { type: "array", items: { type: "string" } },
          vendorRefs: { type: "array", items: { type: "string" } },
          firstFoundDatetime: { type: "string" },
          lastFoundDatetime: { type: "string" },
          lastScanDatetime: { type: "string" },
        },
      },
    },
    truncated: { type: "boolean" },
    lastTicketId: { type: "string" },
  },
};
export const editRemediationTicketsOutputSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
    ticketsAffected: { type: "number" },
    response: { type: "object" },
  },
};
export const getRemediationTicketInfoOutputSchema = {
  type: "object" as const,
  properties: {
    REMEDIATION_TICKETS: {
      type: "object",
      properties: {
        TICKET_LIST: {
          type: "object",
          properties: {
            TICKET: { type: "object" },
          },
        },
      },
    },
  },
};
export const deleteRemediationTicketsOutputSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
    dryRun: { type: "boolean" },
    ticketsAffected: { type: "string" },
    preview: { type: "object" },
    response: { type: "object" },
  },
};
