import { dataSource } from "@prismatic-io/spectral";
import { connection, instanceUrlInput, sysparmQuery } from "../inputs";
import { getAllTables } from "../util";

export const selectTable = dataSource({
  display: {
    label: "Select Table",
    description:
      "Select a table from the list of tables in ServiceNow. Returns the sys_id of the selected table.",
  },
  inputs: {
    connection,
    instanceUrlInput,
    sysparmQuery,
  },
  perform: async (context, { connection, instanceUrlInput, sysparmQuery }) => {
    const allTables =
      (await getAllTables({
        connection,
        instanceUrl: instanceUrlInput,
        queryParameters: {
          sysparm_fields: "sys_id,label",
          sysparm_query: sysparmQuery,
        },
        debug: false,
      })) || [];

    const result = allTables.map(({ sys_id, label }) => ({
      label,
      key: sys_id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
