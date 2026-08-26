import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { Messages, TICKET_BATCH_LIMIT } from "../../constants";
import { editRemediationTicketsExamplePayload } from "../../examplePayloads";
import { editRemediationTicketsInputs } from "../../inputs";
import { editRemediationTicketsOutputSchema } from "../../outputSchemas";
import { parseXml } from "../../util";
export const editRemediationTickets = action({
  display: {
    label: "Edit Remediation Tickets",
    description:
      "Bulk-edit remediation tickets: reassign, change state, or add comments. Up to 20,000 tickets per call. Requires Manager or Unit Manager role — Scanner or Reader credentials silently fail to act on tickets outside the caller's own account.",
  },
  inputs: editRemediationTicketsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: editRemediationTicketsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, ticketNumbers, newAssignee, newState, comment },
  ) => {
    const client = createClassicClient(connection, context.debug.enabled);
    if (ticketNumbers.length > TICKET_BATCH_LIMIT) {
      throw new Error(
        `Qualys allows at most ${TICKET_BATCH_LIMIT} tickets per edit call. Received ${ticketNumbers.length}.`,
      );
    }
    const params = new URLSearchParams();
    if (ticketNumbers.length > 0) {
      params.set("ticket_numbers", ticketNumbers.join(","));
    }
    if (newAssignee) params.set("change_assignee", newAssignee);
    if (newState) params.set("change_state", newState);
    if (comment) params.set("add_comment", comment);
    const response = await client.post<string>("/msp/ticket_edit.php", params);
    const parsed = await parseXml<Record<string, unknown>>(response.data);
    return {
      data: {
        message: Messages.TICKETS_UPDATED,
        ticketsAffected: ticketNumbers.length,
        response: parsed,
      },
    };
  },
  examplePayload: editRemediationTicketsExamplePayload,
});
