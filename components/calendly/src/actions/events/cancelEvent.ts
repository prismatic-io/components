import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, organization, uuid, reason } from "../../inputs";
import { cancelEventExamplePayload } from "../../examplePayloads";

export const cancelEvent = action({
  display: {
    label: "Cancel Event",
    description: "Cancels specified event.",
  },
  perform: async (context, { connection, uuid, reason }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const body: { reason?: string } = {};
    if (reason) {
      body.reason = reason;
    }
    const { data } = await client.post(
      `/scheduled_events/${uuid}/cancellation`,
      body,
    );
    return { data };
  },
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
    uuid: { ...uuid, dataSource: "events" },
    reason,
  },
  examplePayload: cancelEventExamplePayload,
});
