import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { defaultRecordInputs } from "../../inputs/records/general";
import { DEFAULT_DELETE_RESPONSE } from "../../constants";

export const deleteRecord = action({
  display: {
    label: "Delete Record",
    description: "Delete an existing record in SAP Business One.",
  },
  inputs: {
    ...defaultRecordInputs,
    connection,
  },
  perform: async (context, { connection, recordId, recordType }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.delete(`/${recordType}(${recordId})`);
    return {
      data: DEFAULT_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_DELETE_RESPONSE,
  },
});
