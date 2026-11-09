import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listLeadConversationsExamplePayload } from "../../examplePayloads";
import { listLeadConversationsInputs } from "../../inputs";
import { listLeadConversationsOutputSchema } from "../../outputSchemas";
import { buildLeadConversationsQuery, searchGoogleAds } from "../../util";

export const listLeadConversations = action({
  display: {
    label: "List Lead Conversations",
    description:
      "Lists the phone calls, messages and bookings exchanged on Local Services leads, newest first, optionally for one lead.",
  },
  inputs: listLeadConversationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listLeadConversationsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerId,
      managerCustomerId,
      leadId,
      fetchAll,
      pageTokenInput,
    },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
    const data = await searchGoogleAds(client, {
      customerId,
      fetchAll,
      params: {
        query: buildLeadConversationsQuery(customerId, leadId),
        pageToken: pageTokenInput,
      },
    });
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listLeadConversationsExamplePayload,
  examplePayload: listLeadConversationsExamplePayload,
});
