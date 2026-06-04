import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { updateChangeEventExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  event,
  eventId,
  updateChangeEventExample,
} from "../../inputs";

export const updateChangeEvent = action({
  display: {
    label: "Update Change Event",
    description: "Update an existing change event.",
  },
  perform: async (context, { connection, id, event }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(ENDPOINTS.CHANGE_EVENTS_BY_ID(id), {
      change_event: event,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: eventId,
    event: {
      ...event,
      label: "Change Event to Update",
      example: updateChangeEventExample,
    },
  },
  examplePayload: updateChangeEventExamplePayload,
});
