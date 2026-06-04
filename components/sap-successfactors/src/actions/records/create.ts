import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createRecordInputs } from "../../inputs/records";
import { cleanResultFromResponse } from "../../util";

export const createRecord = action({
  display: {
    label: "Create a Record",
    description: "Create a new record in component",
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
});
