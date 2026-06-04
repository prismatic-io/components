import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  fetchAll,
  instanceUrlInput,
  sysparmFields,
  sysparmLimit,
  sysparmOffset,
  sysparmQuery,
} from "../../inputs";
import { fetchAllTableRecords, getAllTables } from "../../util";

export const listTables = action({
  display: {
    label: "List Tables",
    description: "Retrieve a list of all tables",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      instanceUrlInput,
      sysparmFields,
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
      const data = await fetchAllTableRecords(
        client,
        "/api/now/v2/table/sys_db_object",
        { sysparm_fields: sysparmFields, sysparm_query: sysparmQuery },
      );
      return { data };
    }

    return {
      data: await getAllTables({
        connection,
        instanceUrl: instanceUrlInput,
        queryParameters: {
          sysparm_fields: sysparmFields,
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
    sysparmFields,
    sysparmQuery,
    fetchAll,
    sysparmLimit,
    sysparmOffset,
  },
});
