import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getChangeEventExamplePayload } from "../../examplePayloads";
import { connectionInput, eventId } from "../../inputs";

export const getChangeEvent = action({
  display: {
    label: "Get Change Event",
    description: "Retrieve a change event by ID.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(ENDPOINTS.CHANGE_EVENTS_BY_ID(id));

    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: eventId,
  },
  examplePayload: getChangeEventExamplePayload,
});
