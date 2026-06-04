import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listIssueTypesExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const listIssueTypes = action({
  display: {
    label: "List Issue Types",
    description: "Return a list of issue types.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/issuetype");
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
  },
  examplePayload: listIssueTypesExamplePayload,
});
