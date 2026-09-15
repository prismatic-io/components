import { action, outputSchema } from "@prismatic-io/spectral";
import { getEventInviteeOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getEventInviteeInputs } from "../../inputs";
import { getEventInviteeExamplePayload } from "../../examplePayloads";
export const getEventInvitee = action({
  display: {
    label: "Get Event Invitee",
    description:
      "Returns information about a specified Invitee (person invited to an event).",
  },
  performSafety: "safe",
  perform: async (context, { connection, eventUuid, inviteeUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/scheduled_events/${eventUuid}/invitees/${inviteeUuid}`,
    );
    return { data };
  },
  inputs: getEventInviteeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEventInviteeOutputSchema,
  }),
  examplePayload: getEventInviteeExamplePayload,
});
