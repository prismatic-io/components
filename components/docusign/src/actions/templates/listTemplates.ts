import { action, outputSchema } from "@prismatic-io/spectral";
import { listTemplatesOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { listTemplatesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";
import { listTemplatesInputs } from "../../inputs";

export const listTemplates = action({
  display: {
    label: "List Templates",
    description: "Retrieves the list of templates for the specified account.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    return await paginateResults({
      client,
      endpoint: "/templates",
      fetchAll,
      itemsKey: "envelopeTemplates",
    });
  },
  examplePerform: async () => listTemplatesExamplePayload,
  inputs: listTemplatesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTemplatesOutputSchema,
  }),
  examplePayload: listTemplatesExamplePayload,
});
