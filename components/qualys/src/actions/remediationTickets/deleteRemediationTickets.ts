import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { Messages, TICKET_BATCH_LIMIT } from "../../constants";
import { deleteRemediationTicketsExamplePayload } from "../../examplePayloads";
import { deleteRemediationTicketsInputs } from "../../inputs";
import { deleteRemediationTicketsOutputSchema } from "../../outputSchemas";
import { parseXml } from "../../util";
export const deleteRemediationTickets = action({
  display: {
    label: "Delete Remediation Tickets",
    description:
      "Bulk-delete remediation tickets by filter. Defaults to dry-run mode — set Dry Run to false to perform the actual deletion. Up to 20,000 tickets per call. Requires Manager or Unit Manager role. There is no undo.",
  },
  inputs: deleteRemediationTicketsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRemediationTicketsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, ticketNumbers, assignee, ticketState, severity, dryRun },
  ) => {
    const client = createClassicClient(connection, context.debug.enabled);
    if (ticketNumbers.length > TICKET_BATCH_LIMIT) {
      throw new Error(
        `Qualys allows at most ${TICKET_BATCH_LIMIT} tickets per delete call. Received ${ticketNumbers.length}.`,
      );
    }
    const params = new URLSearchParams();
    if (ticketNumbers.length > 0) {
      params.set("ticket_numbers", ticketNumbers.join(","));
    }
    if (assignee) params.set("ticket_assignee", assignee);
    if (ticketState) params.set("states", ticketState);
    if (severity) params.set("vuln_severities", severity);
    if (dryRun) {
      const listResponse = await client.get<string>("/msp/ticket_list.php", {
        params,
      });
      const parsed = await parseXml<Record<string, unknown>>(listResponse.data);
      return {
        data: {
          message: Messages.TICKETS_DRY_RUN,
          dryRun: true,
          ticketsAffected:
            ticketNumbers.length || Messages.DETERMINED_BY_FILTERS,
          preview: parsed,
        },
      };
    }
    const response = await client.post<string>(
      "/msp/ticket_delete.php",
      params,
    );
    const parsed = await parseXml<Record<string, unknown>>(response.data);
    return {
      data: {
        message: Messages.TICKETS_DELETED,
        dryRun: false,
        response: parsed,
      },
    };
  },
  examplePayload: deleteRemediationTicketsExamplePayload,
});
