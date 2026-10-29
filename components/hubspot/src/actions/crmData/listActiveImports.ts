import { action, outputSchema } from "@prismatic-io/spectral";
import { listActiveImportsOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listActiveImportsExamplePayload } from "../../examplePayloads";
import { listActiveImportsInputs } from "../../inputs";
import { getAllPaginatedData } from "../../util";
import { hubspotPaths } from "../../constants";

export const listActiveImports = action({
  display: {
    label: "List Active Imports",
    description: "Returns a paged list of active imports for this account.",
  },
  performSafety: "notAllowed",
  perform: async (context, { timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const data = await getAllPaginatedData(
      client,
      hubspotPaths.imports(),
      true,
      true,
      {},
    );

    return {
      data,
    };
  },

  inputs: listActiveImportsInputs,
  examplePerform: async () => ({
    data: listActiveImportsExamplePayload.data,
  }),
  examplePayload: listActiveImportsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listActiveImportsOutputSchema,
  }),
});
