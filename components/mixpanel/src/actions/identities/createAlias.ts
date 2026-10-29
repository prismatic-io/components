import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAliasInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { createAliasExamplePayload } from "../../examplePayloads";
import { ingestionAckOutputSchema } from "../../outputSchemas";

export const createAlias = action({
  display: {
    label: "Create Alias",
    description: "Mixpanel supports adding an alias to a distinct id.",
  },
  inputs: createAliasInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ingestionAckOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, region, deliveryOptions, distinct_id, project_token, alias },
  ) => {
    const client = createClient(
      region,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const identityData = JSON.stringify({
      event: "$create_alias",
      properties: {
        distinct_id,
        alias,
        token: project_token,
      },
    });
    const body = new URLSearchParams({
      data: identityData,
    });
    if (deliveryOptions.strict) {
      body.append("strict", deliveryOptions.strict);
    }
    const { data } = await client.post("/track#identity-create-alias", body, {
      params: {
        verbose: deliveryOptions.verbose,
        redirect: deliveryOptions.redirect,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    createAliasExamplePayload,
  examplePayload: createAliasExamplePayload,
});
