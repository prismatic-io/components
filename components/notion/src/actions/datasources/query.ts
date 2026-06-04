import { action } from "@prismatic-io/spectral";
import { queryDataSourceInputs } from "../../inputs";
import { createClient } from "../../client";
import { HttpMethod, MAX_PAGE_SIZE } from "../../constants";
import { getPaginatedData } from "../../util";
import { queryDataSourceResponse } from "../../examplePayloads";

export const queryDataSource = action({
  display: {
    label: "Query Data Source",
    description:
      "Query a data source to retrieve pages with optional filtering and sorting.",
  },
  inputs: queryDataSourceInputs,
  perform: async (
    context,
    {
      connection,
      dataSourceId,
      filter,
      sorts,
      startCursor,
      pageSize,
      fetchAll,
      filterProperties,
      resultType,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const requestBody = {
      filter,
      sorts,
      start_cursor: !fetchAll ? startCursor : undefined,
      page_size: pageSize ? pageSize : MAX_PAGE_SIZE,
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
  examplePayload: queryDataSourceResponse,
});
