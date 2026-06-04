import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { deleteRecordExamplePayload } from "../../examplePayloads";
import { deleteRecordInputs } from "../../inputs";
import { getBaseId } from "../../util";

export const deleteRecord = action({
  display: {
    label: "Delete Record",
    description: "Delete a record from the specified table.",
  },
  perform: async (context, params) => {
    const client = createAirtableClient(params.airtableConnection);
    const baseId = getBaseId(params.airtableConnection, params.baseId);
    const { data } = await client.delete(
      `/v0/${baseId}/${params.tableName}/${params.recordId}`,
    );
    return { data };
  },
  inputs: deleteRecordInputs,
  examplePayload: deleteRecordExamplePayload,
});
