import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { FOLDERS_API_PATH } from "../../constants";
import { getFolderJobStatusExamplePayload } from "../../examplePayloads";
import { getFolderJobStatusInputs } from "../../inputs";
import { aemJobOutputSchema } from "../../outputSchemas";
import type { AemJob } from "../../types";

export const getFolderJobStatus = action({
  display: {
    label: "Get Folder Job Status",
    description:
      "Retrieve the state of a Create Folders or Delete Folders job.",
  },
  performSafety: "safe",
  perform: async (context, { connection, jobId }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data } = await client.get<AemJob>(
      `${FOLDERS_API_PATH}/jobs/${encodeURIComponent(jobId)}/status`,
    );
    return { data };
  },
  inputs: getFolderJobStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: aemJobOutputSchema,
  }),
  examplePayload: getFolderJobStatusExamplePayload,
});
