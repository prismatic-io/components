import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { getUserExamplePayload } from "../../examplePayloads";
import { accountId, connectionInput, expand } from "../../inputs";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Get the information and metadata of a user by ID.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/user", {
      params: {
        accountId: params.accountId,
        expand: params.expand || undefined,
      },
    });
    return { data };
  },
  inputs: { jiraConnection: connectionInput, accountId, expand },
  examplePayload: getUserExamplePayload,
});
