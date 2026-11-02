import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { ASSETS_API_PATH } from "../../constants";
import { getImportJobStatusExamplePayload } from "../../examplePayloads";
import { getImportJobStatusInputs } from "../../inputs";
import { importJobOutputSchema } from "../../outputSchemas";
import type { ImportJob } from "../../types";

export const getImportJobStatus = action({
  display: {
    label: "Get Import Job Status",
    description:
      "Retrieve the state and progress of an Import Asset from URL job.",
  },
  performSafety: "safe",
  perform: async (context, { connection, jobId }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data } = await client.get<ImportJob>(
      `${ASSETS_API_PATH}/import/jobs/${encodeURIComponent(jobId)}/status`,
    );
    return { data };
  },
  inputs: getImportJobStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: importJobOutputSchema,
  }),
  examplePayload: getImportJobStatusExamplePayload,
});
