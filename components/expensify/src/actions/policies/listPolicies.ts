import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPoliciesExamplePayload } from "../../examplePayloads";
import { listPoliciesInputs } from "../../inputs";
import { listPoliciesOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const listPolicies = action({
  display: {
    description:
      "Gets a list of policies with some relevant information about them.",
    label: "List Policies",
  },
  inputs: listPoliciesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPoliciesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, adminOnly, type, userEmail }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      inputSettings: {
        type,
        adminOnly,
        userEmail,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => listPoliciesExamplePayload,
  examplePayload: listPoliciesExamplePayload,
});
