import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listIssueFieldsExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const listIssueFields = action({
  display: {
    label: "List Issue Fields",
    description: "List all non-custom issue fields.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/field");
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
  },
  examplePayload: listIssueFieldsExamplePayload,
});
