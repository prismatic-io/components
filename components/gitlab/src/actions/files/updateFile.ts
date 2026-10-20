import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { updateFileExamplePayload } from "../../examplePayloads";
import { updateFileInputs } from "../../inputs";
import { updateFileOutputSchema } from "../../outputSchemas";
export const updateFile = action({
  display: {
    label: "Update File",
    description:
      "Update an existing file in a repository by committing to a branch.",
  },
  inputs: updateFileInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, filePath, branch, content, commitMessage, encoding },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.put(
      `/projects/${project}/repository/files/${filePath}`,
      {
        branch,
        content,
        commit_message: commitMessage,
        encoding,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateFileExamplePayload,
  examplePayload: updateFileExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateFileOutputSchema,
  }),
});
