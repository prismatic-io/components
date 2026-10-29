import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWorkersMetadataExamplePayload } from "../../examplePayloads";
import { getWorkersMetadataInputs } from "../../inputs";
import { getWorkersMetadataOutputSchema } from "../../outputSchemas";

export const getWorkersMetadata = action({
  display: {
    label: "Get Worker Metadata",
    description: "Retrieves a meta on workers",
  },
  inputs: getWorkersMetadataInputs,
  performSafety: "safe",
  perform: async (context, { connection, $filter }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get("/hr/v2/workers/meta", {
      params: {
        $filter,
      },
    });
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkersMetadataOutputSchema,
  }),
  examplePayload: getWorkersMetadataExamplePayload,
});
