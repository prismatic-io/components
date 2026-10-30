import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listIssueCustomFieldsExamplePayload } from "../../examplePayloads";
import { listIssueCustomFieldsInputs } from "../../inputs";
import { listIssueCustomFieldsOutputSchema } from "../../outputSchemas";

export const listIssueCustomFields = action({
  display: {
    label: "List Issue Custom Fields",
    description: "List all configured custom issue fields.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/field");
    const fields = data.filter(({ custom }) => custom);
    return { data: fields };
  },
  examplePerform: async () => listIssueCustomFieldsExamplePayload,
  inputs: listIssueCustomFieldsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIssueCustomFieldsOutputSchema,
  }),
  examplePayload: listIssueCustomFieldsExamplePayload,
});
