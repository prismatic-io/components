import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listIssueTypesExamplePayload } from "../../examplePayloads";
import { listIssueTypesInputs } from "../../inputs";
import { listIssueTypesOutputSchema } from "../../outputSchemas";

export const listIssueTypes = action({
  display: {
    label: "List Issue Types",
    description: "Return a list of issue types.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/issuetype");
    return { data };
  },
  examplePerform: async () => listIssueTypesExamplePayload,
  inputs: listIssueTypesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIssueTypesOutputSchema,
  }),
  examplePayload: listIssueTypesExamplePayload,
});
