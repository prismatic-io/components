import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { getRemediationTicketInfoExamplePayload } from "../../examplePayloads";
import { getRemediationTicketInfoInputs } from "../../inputs";
import { getRemediationTicketInfoOutputSchema } from "../../outputSchemas";
import { parseXml } from "../../util";
export const getRemediationTicketInfo = action({
  display: {
    label: "Get Remediation Ticket Info",
    description:
      "Retrieve detailed information for specific remediation tickets by ticket number or by last-modified timestamp.",
  },
  inputs: getRemediationTicketInfoInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getRemediationTicketInfoOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, ticketNumbers, since }) => {
    const client = createClassicClient(connection, context.debug.enabled);
    const response = await client.get<string>("/msp/get_tickets.php", {
      params: {
        ticket_numbers:
          ticketNumbers.length > 0 ? ticketNumbers.join(",") : undefined,
        since,
      },
    });
    const parsed = await parseXml<Record<string, unknown>>(response.data);
    return { data: parsed };
  },
  examplePayload: getRemediationTicketInfoExamplePayload,
});
