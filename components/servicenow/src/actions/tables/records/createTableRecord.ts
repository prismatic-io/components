import { action } from "@prismatic-io/spectral";
import { createTableRecordInputs } from "../../../inputs";
import { buildPayload, postTable } from "../../../util";
export const createTableRecord = action({
  display: {
    label: "Create Table Record",
    description:
      "Creates a record in the specified table with the specified field names and values.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: {} },
  }),
  inputs: createTableRecordInputs,
});
