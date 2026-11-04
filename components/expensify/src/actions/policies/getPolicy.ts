import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPolicyExamplePayload } from "../../examplePayloads";
import { getPolicyInputs } from "../../inputs";
import { getPolicyOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const getPolicy = action({
  display: {
    description: "Gets specific information about listed policies.",
    label: "Get Policy",
  },
  inputs: getPolicyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPolicyOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, fields, policyIDList, type, userEmail },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      inputSettings: {
        type,
        fields,
        policyIDList,
        userEmail,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => getPolicyExamplePayload,
  examplePayload: getPolicyExamplePayload,
});
