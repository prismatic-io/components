import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { getRecordExamplePayload } from "../../examplePayloads";
import { getRecordInputs } from "../../inputs";
import type { AirtableRecord } from "../../types";
import { getBaseId } from "../../util";

export const getRecord = action({
  display: {
    label: "Get Record",
    description: "Retrieve a record by ID from the specified table.",
  },
  perform: async (context, params) => {
    const client = createAirtableClient(
      params.airtableConnection,
      context.debug.enabled,
    );
    const baseId = getBaseId(params.airtableConnection, params.baseId);
    const { data } = await client.get<AirtableRecord>(
      `/v0/${baseId}/${params.tableName}/${params.record}`,
    );
    return { data };
  },
  inputs: getRecordInputs,
  examplePayload: getRecordExamplePayload,
});
