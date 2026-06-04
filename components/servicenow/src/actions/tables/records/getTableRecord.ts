import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
  tableNameInput,
} from "../../../inputs";
import { getTable } from "../../../util";

export const getTableRecord = action({
  display: {
    label: "Get Table Record",
    description: "Get a record for a given ID in the specified Table",
  },
  perform: async (
    context,
    { connection, instanceUrlInput, apiVersionInput, tableNameInput, sysId },
  ) => {
    return {
      data: await getTable({
        connection,
        tableName: tableNameInput,
        apiVersion: apiVersionInput,
        instanceUrl: instanceUrlInput,
        queryParameters: {
          sys_id: sysId,
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
    sysId,
  },
});
