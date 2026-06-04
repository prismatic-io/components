import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCollectorInputs } from "../../inputs";
import { deleteCollectorExamplePayload } from "../../examplePayloads";






export const deleteCollector = action({
  display: {
    label: "Delete Collector",
    description: "Delete a collector.",
  },
  inputs: deleteCollectorInputs,
  perform: async (context, { connection, collectorId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/collectors/${collectorId}`);

    return {
      data: {
        success: true,
        collectorId,
        message: `Collector ${collectorId} has been deleted.`,
      },
    };
  },
  examplePayload: deleteCollectorExamplePayload,
});
