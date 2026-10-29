import { action } from "@prismatic-io/spectral";
import { connectionInput, type, adminOnly, userEmail } from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";
import { listPolicyExamplePayload } from "../../examplePayloads";

export const listPolicies = action({
  display: {
    description:
      "Gets a list of policies with some relevant information about them.",
    label: "List Policies",
  },
  inputs: {
    connectionInput,
    type,
    adminOnly,
    userEmail,
  },
  perform: async (context, { connectionInput, adminOnly, type, userEmail }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      inputSettings: {
        type: type || undefined,
        adminOnly: adminOnly || undefined,
        userEmail: userEmail || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePayload: {
    data: listPolicyExamplePayload,
  },
});
