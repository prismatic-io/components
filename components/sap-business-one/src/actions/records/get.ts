import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, $select } from "../../inputs/general";
import { defaultRecordInputs } from "../../inputs/records/general";

export const getRecord = action({
  display: {
    label: "Get Record",
    description: "Retrieve a single record from SAP Business One.",
  },
  inputs: { ...defaultRecordInputs, $select, connection },
  perform: async (context, { connection, $select, recordId, recordType }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.get(`/${recordType}(${recordId})`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
});
