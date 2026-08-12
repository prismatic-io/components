import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { createRecordInputs } from "../../inputs";
import { createRecordOutputSchema } from "../../outputSchemas";
import { parseLocationData } from "../../utils";
export const createRecord = action({
  display: {
    label: "Create Record",
    description: "Create record of specified type.",
  },
  inputs: createRecordInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createRecordOutputSchema,
  }),
  examplePayload: createCustomerExamplePayload,
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      "record",
      context.debug.enabled,
    );
    const { data, headers } = await client.post(
      `/${params.recordType}`,
      params.payload,
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
