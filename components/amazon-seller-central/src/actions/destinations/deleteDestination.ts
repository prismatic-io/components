import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDestinationExamplePayload } from "../../examplePayloads/notifications";
import { deleteDestinationInputs } from "../../inputs";
import { deleteDestinationOutputSchema } from "../../outputSchemas";

export const deleteDestination = action({
  display: {
    label: "Delete Destination",
    description: "Deletes the specified destination.",
  },
  examplePayload: deleteDestinationExamplePayload,
  inputs: deleteDestinationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteDestinationOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (context, { connectionInput, destinationId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/notifications/v1/destinations/${destinationId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => deleteDestinationExamplePayload,
});
