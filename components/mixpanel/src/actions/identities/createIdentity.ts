import { action, outputSchema } from "@prismatic-io/spectral";
import { createNoAuthClient } from "../../client";
import { createIdentityInputs } from "../../inputs";
import { createIdentityExamplePayload } from "../../examplePayloads";
import { ingestionAckOutputSchema } from "../../outputSchemas";
export const createIdentity = action({
  display: {
    label: "Create Identity",
    description: "Creates a new Identity",
  },
  inputs: createIdentityInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ingestionAckOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      deliveryOptions,
      region,
      identified_id,
      anon_id,
      project_token,
    },
  ) => {
    const client = createNoAuthClient(
      region,
      connection,
      context.debug.enabled,
    );
    const identityData = JSON.stringify({
      event: "$identify",
      properties: {
        $identified_id: identified_id,
        $anon_id: anon_id,
        token: project_token,
      },
    });
    const body = new URLSearchParams({
      data: identityData,
    });
    if (deliveryOptions.strict) {
      body.append("strict", deliveryOptions.strict);
    }
    const { data } = await client.post("/track#create-identity", body, {
      params: {
        verbose: deliveryOptions.verbose,
        redirect: deliveryOptions.redirect,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createIdentityExamplePayload,
  examplePayload: createIdentityExamplePayload,
});
