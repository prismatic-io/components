import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { RECORD_SERVICE } from "../../constants";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { getRecordInputs } from "../../inputs";
import { getRecordOutputSchema } from "../../outputSchemas";
import { encodeRecordId } from "../../utils";

export const getRecord = action({
  display: {
    label: "Get Record",
    description: "Get record of specified type.",
  },
  inputs: getRecordInputs,
  examplePayload: getCustomerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getRecordOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      RECORD_SERVICE,
      context.debug.enabled,
    );
    const { data, headers } = await client.get(
      `/${params.recordType}/${encodeRecordId(params.id)}`,
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
