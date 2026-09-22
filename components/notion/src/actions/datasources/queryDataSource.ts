import { action, outputSchema } from "@prismatic-io/spectral";
import { queryDataSourceOutputSchema } from "../../outputSchemas";
import { queryDataSourceInputs } from "../../inputs";
import { createClient } from "../../client";
import { HttpMethod, MAX_PAGE_SIZE } from "../../constants";
import { getPaginatedData } from "../../utils";
import { queryDataSourceExamplePayload } from "../../examplePayloads";
export const queryDataSource = action({
  display: {
    label: "Query Data Source",
    description:
      "Query a data source to retrieve pages with optional filtering and sorting.",
  },
  inputs: queryDataSourceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: queryDataSourceOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      dataSourceId,
      filter,
      sorts,
      pagination,
      fetchAll,
      filterProperties,
      resultType,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const requestBody = {
      filter,
      sorts,
      start_cursor: !fetchAll ? pagination.startCursor : undefined,
      page_size: pagination.pageSize ? pagination.pageSize : MAX_PAGE_SIZE,
      result_type: resultType,
    };
    const params = {
      filter_properties: filterProperties,
    };
    const { data } = await getPaginatedData(
      client,
      HttpMethod.POST,
      `/data_sources/${dataSourceId}/query`,
      fetchAll,
      requestBody,
      filterProperties ? params : undefined,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => queryDataSourceExamplePayload,
  examplePayload: queryDataSourceExamplePayload,
});
