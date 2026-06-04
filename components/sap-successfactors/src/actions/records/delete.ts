import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteRecordInputs } from "../../inputs/records";

export const deleteRecord = action({
  display: {
    label: "Delete Record",
    description: "Delete an existing record in component",
  },
  inputs: deleteRecordInputs,
  perform: async (context, { connection, recordTypeId, recordType }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/${recordType}('${recordTypeId}')`);
    return {
      data,
    };
  },
});
