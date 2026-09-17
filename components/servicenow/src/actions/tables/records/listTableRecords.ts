import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listTableRecordsInputs } from "../../../inputs";
import { fetchAllTableRecords, getTable } from "../../../util";
export const listTableRecords = action({
  display: {
    label: "List Table Records",
    description: "Lists records in the specified table.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      fetchAll,
      instanceUrlInput,
      apiVersionInput,
      tableNameInput,
      pagination,
      sysparmQuery,
    },
  ) => {
    if (fetchAll) {
      const client = createClient(
        connection,
        instanceUrlInput,
        context.debug.enabled,
      );
      const version =
        util.types.toString(apiVersionInput) === "latest"
          ? ""
          : `${util.types.toString(apiVersionInput)}/`;
      const data = await fetchAllTableRecords(
        client,
        `/api/now/${version}table/${util.types.toString(tableNameInput)}`,
        { sysparm_query: sysparmQuery },
      );
      return { data };
    }
    return {
      data: await getTable({
        connection,
        tableName: tableNameInput,
        apiVersion: apiVersionInput,
        instanceUrl: instanceUrlInput,
        queryParameters: {
          sysparm_limit: pagination.sysparmLimit,
          sysparm_offset: pagination.sysparmOffset,
          sysparm_query: sysparmQuery,
        },
        debug: context.debug.enabled,
      }),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: [] },
  }),
  inputs: listTableRecordsInputs,
});
