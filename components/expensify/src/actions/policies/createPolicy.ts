import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOB_TYPES } from "../../constants";
import { createPolicyExamplePayload } from "../../examplePayloads";
import { createPolicyInputs } from "../../inputs";
import { createPolicyOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const createPolicy = action({
  display: {
    description: "Creates a policy.",
    label: "Create Policy",
  },
  inputs: createPolicyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createPolicyOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, type, policyName, plan }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: JOB_TYPES.CREATE,
      inputSettings: {
        type,
        policyName,
        plan,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => createPolicyExamplePayload,
  examplePayload: createPolicyExamplePayload,
});
