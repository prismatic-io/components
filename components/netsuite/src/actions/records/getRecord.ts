import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { getRecordInputs } from "../../inputs";

export const getRecord = action({
  display: {
    label: "Get Record",
    description: "Get record of specified type",
  },
  inputs: getRecordInputs,
  examplePayload: getCustomerExamplePayload,
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      "record",
      context.debug.enabled,
    );
    const { data, headers } = await client.get(
      `/${params.recordType}/${params.id}`,
      {
        params: {
          expandSubResources: params.expandSubResources,
          simpleEnumFormat: params.simpleEnumFormat,
          fields: params.fields,
        },
      },
    );
    return { data: { data, headers: headers as Record<string, string> } };
  },
});
