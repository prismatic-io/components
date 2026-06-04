import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCustomerExamplePayload } from "../../examplePayloads";
import { deleteRecordInputs } from "../../inputs";

export const deleteRecord = action({
  display: {
    label: "Delete Record",
    description: "Delete record of the specified type",
  },
  inputs: deleteRecordInputs,
  examplePayload: deleteCustomerExamplePayload,
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      "record",
      context.debug.enabled,
    );
    const { data, headers } = await client.delete(
      `/${params.recordType}/${params.id}`,
    );
    return { data: { data, headers: headers as Record<string, string> } };
  },
});
