import { action, outputSchema } from "@prismatic-io/spectral";
import { listEventInviteesOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listEventInviteesInputs } from "../../inputs";
import { listEventInviteesExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";
export const listEventInvitees = action({
  display: {
    label: "List Event Invitees",
    description: "Returns a list of Invitees for an event.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, uuid, email, sort, status }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await paginator(client, `/scheduled_events/${uuid}/invitees`, {
      email,
      sort,
      status,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listEventInviteesExamplePayload.data,
  }),
  inputs: listEventInviteesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEventInviteesOutputSchema,
  }),
  examplePayload: listEventInviteesExamplePayload,
});
