import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listIssueCustomFieldsExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const listIssueCustomFields = action({
  display: {
    label: "List Issue Custom Fields",
    description: "List all configured custom issue fields.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/field");
    const fields = data.filter(({ custom }) => custom);
    return { data: fields };
  },
  inputs: {
    jiraConnection: connectionInput,
  },
  examplePayload: listIssueCustomFieldsExamplePayload,
});
