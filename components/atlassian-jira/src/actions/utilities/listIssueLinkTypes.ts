import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listIssueLinkTypesExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const listIssueLinkTypes = action({
  display: {
    label: "List Issue Link Types",
    description: "List all available issue link types.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/issueLinkType");
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
  },
  examplePayload: listIssueLinkTypesExamplePayload,
});
