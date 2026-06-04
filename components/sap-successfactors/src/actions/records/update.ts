import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_CONTENT_RESPONSE, NO_CONTENT_RESPONSE_TEXT } from "../../constants";
import { updateRecordInputs } from "../../inputs/records";

export const updateRecord = action({
  display: {
    label: "Update Record",
    description: "Update an existing record in component",
  },
  inputs: updateRecordInputs,
  perform: async (context, { connection, recordTypeId, recordType }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.put(`/${recordType}('${recordTypeId}')`);
    return {
      data: NO_CONTENT_RESPONSE_TEXT,
    };
  },
  examplePayload: NO_CONTENT_RESPONSE,
});
