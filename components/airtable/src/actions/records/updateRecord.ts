import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { updateRecordExamplePayload } from "../../examplePayloads";
import { updateRecordInputs } from "../../inputs";
import type { AirtableRecord } from "../../types";
import { getBaseId } from "../../util";

export const updateRecord = action({
  display: {
    label: "Update Record",
    description: "Update the field values of a record in the specified table.",
  },
  perform: async (
    context,
    {
      recordFields,
      record,
      baseId,
      tableName,
      airtableConnection,
      dynamicFields,
    },
  ) => {
    const NO_RECORDS = 0;
    const client = createAirtableClient(
      airtableConnection,
      context.debug.enabled,
    );
    const retrievedBaseId = getBaseId(airtableConnection, baseId);
    const fields =
      Object.keys(dynamicFields)?.length > NO_RECORDS
        ? dynamicFields
        : recordFields;

    const { data } = await client.patch<AirtableRecord>(
      `/v0/${retrievedBaseId}/${tableName}/${record}`,
      {
        fields,
        typecast: true,
      },
    );
    return { data };
  },
  inputs: updateRecordInputs,
  examplePayload: updateRecordExamplePayload,
});
