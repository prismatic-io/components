import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { getByExternalIdExamplePayload } from "../../examplePayloads";
import { getByExternalIdInputs } from "../../inputs";
import { getByExternalIdOutputSchema } from "../../outputSchemas";
export const getByExternalId = action({
  display: {
    label: "Get Ticket By External ID",
    description: "Get a ticket by external ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const result = await client.tickets.listWithFilter(
      "external_id",
      params.externalId as string | number,
    );
    return {
      data: result,
    };
  },
  examplePerform: async () => getByExternalIdExamplePayload,
  inputs: getByExternalIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getByExternalIdOutputSchema,
  }),
  examplePayload: getByExternalIdExamplePayload,
});
