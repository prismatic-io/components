import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateCustomerExamplePayload } from "../../examplePayloads";
import { updateRecordInputs } from "../../inputs";
import { parseLocationData } from "../../utils";

export const updateRecord = action({
  display: {
    label: "Update Record",
    description: "Update record of the specified type",
  },
  inputs: updateRecordInputs,
  examplePayload: updateCustomerExamplePayload,
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      "record",
      context.debug.enabled,
    );
    const { data, headers } = await client.patch(
      `/${params.recordType}/${params.id}`,
      params.payload,
      {
        params: {
          replace: params.replace,
          replaceSelectedFields: params.replaceSelectedFields,
        },
      },
    );
    const recordData = parseLocationData(headers.location);
    return {
      data: {
        data: { ...data, ...recordData },
        headers: headers as Record<string, string>,
      },
    };
  },
});
