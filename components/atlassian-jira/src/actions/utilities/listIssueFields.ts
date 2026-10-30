import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listIssueFieldsExamplePayload } from "../../examplePayloads";
import { listIssueFieldsInputs } from "../../inputs";
import { listIssueFieldsOutputSchema } from "../../outputSchemas";

export const listIssueFields = action({
  display: {
    label: "List Issue Fields",
    description: "List all non-custom issue fields.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/field");
    return { data };
  },
  examplePerform: async () => listIssueFieldsExamplePayload,
  inputs: listIssueFieldsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIssueFieldsOutputSchema,
  }),
  examplePayload: listIssueFieldsExamplePayload,
});
