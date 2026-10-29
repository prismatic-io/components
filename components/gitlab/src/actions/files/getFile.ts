import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { getFileExamplePayload } from "../../examplePayloads";
import { getFileInputs } from "../../inputs";
import { getFileOutputSchema } from "../../outputSchemas";

export const getFile = action({
  display: {
    label: "Get File",
    description:
      "Retrieve a file from a repository. The content is returned Base64-encoded.",
  },
  inputs: getFileInputs,
  performSafety: "safe",
  perform: async (context, { connection, project, filePath, ref }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.get(
      `/projects/${project}/repository/files/${filePath}`,
      {
        params: { ref },
      },
    );
    return { data };
  },
  examplePayload: getFileExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFileOutputSchema,
  }),
});
