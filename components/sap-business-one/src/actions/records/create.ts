import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createRecordInputs } from "../../inputs/records/create";

export const createRecord = action({
  display: {
    label: "Create Record",
    description: "Create a new record in SAP Business One.",
  },
  inputs: {
    ...createRecordInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, recordType }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.post(`/${recordType}`, {
      ...bodyFields,
    });
    return {
      data,
    };
  },
});
