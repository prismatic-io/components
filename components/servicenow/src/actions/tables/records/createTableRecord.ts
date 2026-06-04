import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  fieldValuesInput,
  instanceUrlInput,
  tableNameInput,
} from "../../../inputs";
import { buildPayload, postTable } from "../../../util";

export const createTableRecord = action({
  display: {
    label: "Create Table Record",
    description:
      "Creates a record in the specified table with the specified field names and values",
  },
  perform: async (
    context,
    {
      connection,
      instanceUrlInput,
      apiVersionInput,
      tableNameInput,
      fieldValuesInput,
    },
  ) => {
    const payload = buildPayload(fieldValuesInput);
    return {
      data: await postTable({
        connection,
        tableName: tableNameInput,
        apiVersion: apiVersionInput,
        instanceUrl: instanceUrlInput,
        payload,
        debug: context.debug.enabled,
      }),
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    tableNameInput,
    fieldValuesInput,
  },
});
