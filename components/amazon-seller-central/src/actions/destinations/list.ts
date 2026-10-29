import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDestinationsExamplePayload } from "../../examplePayloads/notifications";
import { connectionInput } from "../../inputs";

export const listDestinations = action({
  display: {
    label: "List Destinations",
    description: "Returns information about all destinations.",
  },
  examplePayload: listDestinationsExamplePayload,
  inputs: {
    connectionInput,
  },
  perform: async (context, { connectionInput }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get("/notifications/v1/destinations");
    return {
      data,
    };
  },
});
