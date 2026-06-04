import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getRecordInputs } from "../../inputs/records";
import { cleanResultFromResponse } from "../../util";

export const getRecord = action({
  display: {
    label: "Get Record",
    description: "Retrieve a single record from component",
  },
  inputs: getRecordInputs,
  perform: async (context, { connection, recordType, recordTypeId, $select }) => {
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
});
