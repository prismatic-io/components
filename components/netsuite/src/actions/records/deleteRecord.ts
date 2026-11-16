import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { RECORD_SERVICE } from "../../constants";
import { deleteCustomerExamplePayload } from "../../examplePayloads";
import { deleteRecordInputs } from "../../inputs";
import { encodeRecordId } from "../../utils";

export const deleteRecord = action({
  display: {
    label: "Delete Record",
    description: "Delete record of the specified type.",
  },
  inputs: deleteRecordInputs,
  examplePayload: deleteCustomerExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      RECORD_SERVICE,
      context.debug.enabled,
    );
    const { data, headers } = await client.delete(
      `/${params.recordType}/${encodeRecordId(params.id)}`,
    );
    return { data: { data, headers: headers as Record<string, string> } };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    deleteCustomerExamplePayload,
});
