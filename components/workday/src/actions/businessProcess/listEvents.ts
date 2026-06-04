import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listEventsExamplePayload } from "../../examplePayloads";
import { listEventsInputs } from "../../inputs";

export const listEvents = action({
  display: {
    label: "List Events",
    description:
      "Retrieves a collection of business process events based on the specified parameters. Exactly one worker parameter must be specified; otherwise, a blank response is returned.",
  },
  perform: async (context, { connection, params, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(`${SERVICES.businessProcess}/events`, {
      params: { limit, offset, ...params },
    });
    return {
      data,
    };
  },
  inputs: listEventsInputs,
  examplePayload: listEventsExamplePayload,
});
