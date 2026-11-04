import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOB_TYPES } from "../../constants";
import { updatePolicyExamplePayload } from "../../examplePayloads";
import { updatePolicyInputs } from "../../inputs";
import { updatePolicyOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const updatePolicy = action({
  display: {
    description: "Manage categories, tags and report fields on a policy.",
    label: "Update Policy",
  },
  inputs: updatePolicyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatePolicyOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connectionInput,
      type,
      categories,
      policyIDList,
      policyId,
      reportFields,
      tags,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: JOB_TYPES.UPDATE,
      inputSettings: {
        type,
        policyID: policyId,
        policyIDList,
      },
      categories,
      tags,
      reportFields,
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => updatePolicyExamplePayload,
  examplePayload: updatePolicyExamplePayload,
});
