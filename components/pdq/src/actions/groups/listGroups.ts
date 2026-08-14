import { action, outputSchema } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { GROUPS_ENDPOINT } from "../../constants";
import { listGroupsExamplePayload } from "../../examplePayloads/groups";
import { listGroupsInputs } from "../../inputs";
import { listGroupsOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Retrieve a list of groups.",
  },
  inputs: listGroupsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listGroupsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, filters = {}, pagination = {} },
  ) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const data = await fetchAllData(
      client,
      GROUPS_ENDPOINT,
      {
        ...customQueryParams,
        filter: filters.filter,
        page: pagination.page,
        pageSize: pagination.pageSize,
        sort: filters.sort,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listGroupsExamplePayload.data,
  }),
  examplePayload: listGroupsExamplePayload,
});
