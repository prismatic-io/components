import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchStreamExamplePayload } from "../../examplePayloads";
import { searchStreamInputs } from "../../inputs";
import { searchStreamOutputSchema } from "../../outputSchemas";
import type { SearchStreamBatch } from "../../types";
import { mergeSearchStreamBatches } from "../../util";

export const searchStream = action({
  display: {
    label: "Search Stream",
    description:
      "Returns every row matching a GAQL query in one call, without page tokens, for large reports.",
  },
  inputs: searchStreamInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchStreamOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customerId, query, managerCustomerId, linkedCustomerId },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
      linkedCustomerId,
    });
    const { data } = await client.post<SearchStreamBatch[]>(
      `/customers/${customerId}/googleAds:searchStream`,
      { query },
    );
    return { data: mergeSearchStreamBatches(data) };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    searchStreamExamplePayload,
  examplePayload: searchStreamExamplePayload,
});
