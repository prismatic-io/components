import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { ASSETS_API_PATH } from "../../constants";
import { getAssetJobStatusExamplePayload } from "../../examplePayloads";
import { getAssetJobStatusInputs } from "../../inputs";
import { aemJobOutputSchema } from "../../outputSchemas";
import type { AemJob } from "../../types";

export const getAssetJobStatus = action({
  display: {
    label: "Get Asset Job Status",
    description: "Retrieve the state of a Delete Asset job.",
  },
  performSafety: "safe",
  perform: async (context, { connection, jobId }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data } = await client.get<AemJob>(
      `${ASSETS_API_PATH}/jobs/${encodeURIComponent(jobId)}/status`,
    );
    return { data };
  },
  inputs: getAssetJobStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: aemJobOutputSchema,
  }),
  examplePayload: getAssetJobStatusExamplePayload,
});
