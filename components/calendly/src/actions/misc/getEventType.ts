import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, organization, uuid } from "../../inputs";
import { getEventTypeExamplePayload } from "../../examplePayloads";

export const getEventType = action({
  display: {
    label: "Get Event Type",
    description: "Returns information about a specified Event Type.",
  },
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get(`/event_types/${uuid}`);
    return { data };
  },
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
    uuid: { ...uuid, dataSource: "eventTypes" },
  },
  examplePayload: getEventTypeExamplePayload,
});
