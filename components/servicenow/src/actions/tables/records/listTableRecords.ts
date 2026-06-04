import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  apiVersionInput,
  connection,
  fetchAll,
  instanceUrlInput,
  sysparmLimit,
  sysparmOffset,
  sysparmQuery,
  tableNameInput,
} from "../../../inputs";
import { fetchAllTableRecords, getTable } from "../../../util";

export const listTableRecords = action({
  display: {
    label: "List Table Records",
    description: "Lists records in the specified table",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      instanceUrlInput,
      apiVersionInput,
      tableNameInput,
      sysparmLimit,
      sysparmOffset,
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
          sysparm_limit: sysparmLimit,
          sysparm_offset: sysparmOffset,
          sysparm_query: sysparmQuery,
        },
        debug: context.debug.enabled,
      }),
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    tableNameInput,
    sysparmQuery,
    fetchAll,
    sysparmLimit,
    sysparmOffset,
  },
});
