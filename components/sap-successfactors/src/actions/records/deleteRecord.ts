import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteRecordExamplePayload } from "../../examplePayloads";
import { deleteRecordInputs } from "../../inputs";

export const deleteRecord = action({
  display: {
    label: "Delete Record",
    description: "Delete an existing record in SAP SuccessFactors.",
  },
  inputs: deleteRecordInputs,
  perform: async (context, { connection, recordTypeId, recordType }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/${recordType}('${recordTypeId}')`);
    return {
      data,
    };
  },
  examplePayload: deleteRecordExamplePayload,
});
