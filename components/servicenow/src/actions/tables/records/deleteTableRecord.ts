import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
  tableNameInput,
} from "../../../inputs";
import { deleteTable } from "../../../util";

export const deleteTableRecord = action({
  display: {
    label: "Delete Table Record",
    description: "Delete a record for a given ID in the specified Table",
  },
  perform: async (
    context,
    { connection, instanceUrlInput, apiVersionInput, tableNameInput, sysId },
  ) => {
    return {
      data: await deleteTable({
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
