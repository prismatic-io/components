import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get the information and metadata of the current user.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/myself");
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
  },
  examplePayload: getCurrentUserExamplePayload,
});
