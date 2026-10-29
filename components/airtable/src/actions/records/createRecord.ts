import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { createRecordExamplePayload } from "../../examplePayloads";
import { createRecordInputs } from "../../inputs";
import type { AirtableRecord } from "../../types";
import { getBaseId } from "../../util";

export const createRecord = action({
  display: {
    label: "Create Record",
    description: "Create a new record in the specified table.",
  },
  perform: async (
    context,
    { recordFields, dynamicFields, airtableConnection, baseId, tableName },
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

    const { data } = await client.post<AirtableRecord>(
      `/v0/${retrievedBaseId}/${tableName}`,
      {
        fields,
        typecast: true,
      },
    );
    return { data };
  },
  inputs: createRecordInputs,
  examplePayload: createRecordExamplePayload,
});
