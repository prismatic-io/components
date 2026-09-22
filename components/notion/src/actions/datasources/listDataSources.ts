import { action, outputSchema } from "@prismatic-io/spectral";
import { listDataSourcesOutputSchema } from "../../outputSchemas";
import { listDataSourcesInputs } from "../../inputs";
import { createClient } from "../../client";
import { HttpMethod, MAX_PAGE_SIZE } from "../../constants";
import { getPaginatedData } from "../../utils";
import { listDataSourcesExamplePayload } from "../../examplePayloads";
export const listDataSources = action({
  display: {
    label: "List Data Sources",
    description: "List all data sources accessible to the integration.",
  },
  inputs: listDataSourcesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDataSourcesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, startCursor }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData(
      client,
      HttpMethod.POST,
      "/search",
      fetchAll,
      {
        filter: {
          value: "data_source",
          property: "object",
        },
        start_cursor: fetchAll ? undefined : startCursor,
        page_size: MAX_PAGE_SIZE,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listDataSourcesExamplePayload,
  examplePayload: listDataSourcesExamplePayload,
});
