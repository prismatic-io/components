import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { listGroupsExamplePayload } from "../../examplePayloads/groups";
import { connection, listDefaultInputs } from "../../inputs/general";
import { fetchAllData } from "../../util";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Retrieve a list of groups",
  },
  inputs: {
    ...listDefaultInputs,
    connection,
  },
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, filter, page, pageSize, sort },
  ) => {
    const client = createHttpClient(connection, context.debug.enabled);

    const data = await fetchAllData(
      client,
      "/groups",
      {
        ...customQueryParams,
        filter,
        page,
        pageSize,
        sort,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listGroupsExamplePayload,
  },
});
