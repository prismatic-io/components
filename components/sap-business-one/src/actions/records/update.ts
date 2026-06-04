import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_UPDATE_RESPONSE } from "../../constants";
import { updateRecordInputs } from "../../inputs/records/update";

export const updateRecord = action({
  display: {
    label: "Update Record",
    description: "Update an existing record in SAP Business One.",
  },
  inputs: {
    ...updateRecordInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, recordId, recordType }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.patch(`/${recordType}(${recordId})`, {
      ...bodyFields,
    });

    return {
      data: DEFAULT_UPDATE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_UPDATE_RESPONSE,
  },
});
