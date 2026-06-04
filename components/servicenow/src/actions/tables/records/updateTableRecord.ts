import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  fieldValuesInput,
  instanceUrlInput,
  sysId,
  tableNameInput,
} from "../../../inputs";
import { buildPayload, putTable } from "../../../util";

export const updateTableRecord = action({
  display: {
    label: "Update Table Record",
    description:
      "Updates a record in the specified table with the specified field names and values",
  },
  perform: async (
    context,
    {
      connection,
      instanceUrlInput,
      apiVersionInput,
      tableNameInput,
      sysId,
      fieldValuesInput,
    },
  ) => {
    return {
      data: await putTable({
        connection,
        tableName: tableNameInput,
        apiVersion: apiVersionInput,
        instanceUrl: instanceUrlInput,
        queryParameters: {
          sys_id: sysId,
        },
        payload: buildPayload(fieldValuesInput),
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
    fieldValuesInput,
  },
});
