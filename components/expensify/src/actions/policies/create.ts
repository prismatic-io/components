import { action } from "@prismatic-io/spectral";
import { connectionInput, type, policyName, plan } from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";
import { createPolicyExamplePayload } from "../../examplePayloads";

export const createPolicy = action({
  display: {
    description: "Creates a policy.",
    label: "Create Policy",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "policy",
      comments: "Specifies to the job that it has to create a policy.",
    },
    policyName,
    plan,
  },
  perform: async (context, { connectionInput, type, policyName, plan }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "create",
      inputSettings: {
        type: type || undefined,
        policyName: policyName || undefined,
        plan: plan || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePayload: {
    data: createPolicyExamplePayload,
  },
});
