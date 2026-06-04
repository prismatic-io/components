import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, organization, uuid } from "../../inputs";
import { getEventExamplePayload } from "../../examplePayloads";

export const getEvent = action({
  display: {
    label: "Get Event",
    description: "Returns information about a specified Event.",
  },
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(`/scheduled_events/${uuid}`);
    return { data };
  },
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
    uuid: { ...uuid, dataSource: "events" },
  },
  examplePayload: getEventExamplePayload,
});
