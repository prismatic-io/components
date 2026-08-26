import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { listRemediationTicketsExamplePayload } from "../../examplePayloads";
import { listRemediationTicketsInputs } from "../../inputs";
import { listRemediationTicketsOutputSchema } from "../../outputSchemas";
import type { TicketListResponse } from "../../types";
import { ensureArray, normalizeTicket, parseXml } from "../../util";
export const listRemediationTickets = action({
  display: {
    label: "List Remediation Tickets",
    description:
      "List remediation tickets from the Classic API. Maximum 1,000 tickets per call — the API truncates silently beyond that limit. The response includes a truncation flag so callers can detect incomplete results.",
  },
  inputs: listRemediationTicketsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRemediationTicketsOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, assignee, ticketState, severity, modifiedSinceDatetime },
  ) => {
    const client = createClassicClient(connection, context.debug.enabled);
    const response = await client.get<string>("/msp/ticket_list.php", {
      params: {
        ticket_assignee: assignee,
        states: ticketState,
        vuln_severities: severity,
        modified_since_datetime: modifiedSinceDatetime,
      },
    });
    const parsed = await parseXml<TicketListResponse>(response.data);
    const tickets = ensureArray(
      parsed.REMEDIATION_TICKETS?.TICKET_LIST?.TICKET,
    );
    const truncationId = parsed.REMEDIATION_TICKETS?.TRUNCATION?.$?.last;
    return {
      data: {
        tickets: tickets.map(normalizeTicket),
        truncated: !!truncationId,
        ...(truncationId ? { lastTicketId: truncationId } : {}),
      },
    };
  },
  examplePayload: listRemediationTicketsExamplePayload,
});
