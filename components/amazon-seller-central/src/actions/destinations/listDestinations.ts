import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDestinationsExamplePayload } from "../../examplePayloads/notifications";
import { listDestinationsInputs } from "../../inputs";
import { listDestinationsOutputSchema } from "../../outputSchemas";

export const listDestinations = action({
  display: {
    label: "List Destinations",
    description: "Returns information about all destinations.",
  },
  examplePayload: listDestinationsExamplePayload,
  inputs: listDestinationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDestinationsOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get("/notifications/v1/destinations");
    return {
      data,
    };
  },
  examplePerform: async () => listDestinationsExamplePayload,
});
