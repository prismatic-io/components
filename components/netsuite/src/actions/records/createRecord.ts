import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { createRecordInputs } from "../../inputs";
import { parseLocationData } from "../../utils";

export const createRecord = action({
  display: {
    label: "Create Record",
    description: "Create record of specified type",
  },
  inputs: createRecordInputs,
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
