import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createRecordExamplePayload } from "../../examplePayloads";
import { createRecordInputs } from "../../inputs";
import { cleanResultFromResponse } from "../../util";

export const createRecord = action({
  display: {
    label: "Create Record",
    description: "Create a new record in SAP SuccessFactors.",
  },
  inputs: createRecordInputs,
  perform: async (context, { connection, recordType, additionalInputs }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/${recordType}`, {
      ...additionalInputs,
    });
    return {
      data: cleanResultFromResponse(data),
    };
  },
  examplePayload: createRecordExamplePayload,
});
