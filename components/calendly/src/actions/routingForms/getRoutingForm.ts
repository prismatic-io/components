import { action, outputSchema } from "@prismatic-io/spectral";
import { getRoutingFormOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getRoutingFormInputs } from "../../inputs";
import { getRoutingFormExamplePayload } from "../../examplePayloads";
export const getRoutingForm = action({
  display: {
    label: "Get Routing Form",
    description: "Get a specified Routing Form.",
  },
  performSafety: "safe",
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(`/routing_forms/${uuid}`);
    return { data };
  },
  inputs: getRoutingFormInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getRoutingFormOutputSchema,
  }),
  examplePayload: getRoutingFormExamplePayload,
});
