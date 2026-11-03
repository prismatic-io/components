import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDestinationExamplePayload } from "../../examplePayloads/notifications";
import { getDestinationInputs } from "../../inputs";
import { getDestinationOutputSchema } from "../../outputSchemas";

export const getDestination = action({
  display: {
    label: "Get Destination",
    description: "Returns information about the specified destination.",
  },
  examplePayload: getDestinationExamplePayload,
  inputs: getDestinationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDestinationOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput, destinationId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/notifications/v1/destinations/${destinationId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => getDestinationExamplePayload,
});
