import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getRecordExamplePayload } from "../../examplePayloads";
import { getRecordInputs } from "../../inputs";
import { cleanResultFromResponse } from "../../util";

export const getRecord = action({
  display: {
    label: "Get Record",
    description: "Retrieve a single record from SAP SuccessFactors.",
  },
  inputs: getRecordInputs,
  perform: async (
    context,
    { connection, recordType, recordTypeId, $select },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/${recordType}('${recordTypeId}')`, {
      params: {
        $select,
      },
    });
    return {
      data: cleanResultFromResponse(data),
    };
  },
  examplePayload: getRecordExamplePayload,
});
