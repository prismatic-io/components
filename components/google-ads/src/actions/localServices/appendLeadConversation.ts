import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { appendLeadConversationExamplePayload } from "../../examplePayloads";
import { appendLeadConversationInputs } from "../../inputs";
import { appendLeadConversationOutputSchema } from "../../outputSchemas";
import { leadResourceName } from "../../util";

export const appendLeadConversation = action({
  display: {
    label: "Append Lead Conversation",
    description:
      "Appends a text message to the conversation of a Local Services lead.",
  },
  inputs: appendLeadConversationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: appendLeadConversationOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customerId, leadId, text, managerCustomerId },
  ) => {
    const localServicesLead = leadResourceName(customerId, leadId);
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
    const { data } = await client.post(
      `/customers/${customerId}/localServices:appendLeadConversation`,
      { conversations: [{ localServicesLead, text }] },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    appendLeadConversationExamplePayload,
  examplePayload: appendLeadConversationExamplePayload,
});
