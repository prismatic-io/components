import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, eventUuid, inviteeUuid, organization } from "../../inputs";
import { getEventInviteeExamplePayload } from "../../examplePayloads";

export const getEventInvitee = action({
  display: {
    label: "Get Event Invitee",
    description:
      "Returns information about a specified Invitee (person invited to an event).",
  },
  perform: async (context, { connection, eventUuid, inviteeUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/scheduled_events/${eventUuid}/invitees/${inviteeUuid}`,
    );
    return { data };
  },
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
    eventUuid,
    inviteeUuid,
  },
  examplePayload: getEventInviteeExamplePayload,
});
