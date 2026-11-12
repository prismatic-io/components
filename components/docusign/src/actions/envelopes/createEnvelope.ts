import { action, outputSchema } from "@prismatic-io/spectral";
import { createEnvelopeOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { createEnvelopeInputs } from "../../inputs";
import { createEnvelopeExamplePayload } from "../../examplePayloads";

export const createEnvelope = action({
  display: {
    label: "Create Envelope",
    description: "Creates and sends an envelope or creates a draft envelope.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, jsonInput, changeRoutingOrder, mergeRolesOnDraft },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.post(`/envelopes`, jsonInput, {
      params: {
        change_routing_order: changeRoutingOrder,
        merge_roles_on_draft: mergeRolesOnDraft,
      },
    });
    return { data };
  },
  examplePerform: async () => createEnvelopeExamplePayload,
  inputs: createEnvelopeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createEnvelopeOutputSchema,
  }),
  examplePayload: createEnvelopeExamplePayload,
});
