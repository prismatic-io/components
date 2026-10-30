import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { getIssueExamplePayload } from "../../examplePayloads";
import { getIssueInputs } from "../../inputs";
import { getIssueOutputSchema } from "../../outputSchemas";
import { getIssueById } from "../../util";

export const getIssue = action({
  display: {
    label: "Get Issue",
    description: "Get the information and metadata of an issue.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const data = await getIssueById(client, params.issueId);
    return { data };
  },
  inputs: getIssueInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getIssueOutputSchema,
  }),
  examplePayload: getIssueExamplePayload,
});
