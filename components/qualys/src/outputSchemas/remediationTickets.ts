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
          status: { type: "string" },
          invalid: { type: "string" },
          assignee: { type: "string" },
          qid: { type: "string" },
          severity: { type: "string" },
          type: { type: "string" },
          title: { type: "string" },
          category: { type: "string" },
          hosts: { type: "array", items: { type: "object" } },
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
