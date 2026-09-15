import { action, outputSchema } from "@prismatic-io/spectral";
import { listRoutingFormsOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listRoutingFormsInputs } from "../../inputs";
import { listRoutingFormsExamplePayload } from "../../examplePayloads";
import { getRoutingForms } from "../../util";
export const listRoutingForms = action({
  display: {
    label: "List Routing Forms",
    description: "Get a list of Routing Forms for a specified Organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, organization, sort }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await getRoutingForms(client, organization, sort);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listRoutingFormsExamplePayload.data,
  }),
  inputs: listRoutingFormsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRoutingFormsOutputSchema,
  }),
  examplePayload: listRoutingFormsExamplePayload,
});
