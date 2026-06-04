import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { listRecordsExamplePayload } from "../../examplePayloads";
import { listRecordsInputs } from "../../inputs";
import type { AirtableRecord } from "../../types";
import { getBaseId, paginateData } from "../../util";

export const listRecords = action({
  display: {
    label: "List Records",
    description: "List all records within the specified table.",
  },
  perform: async (context, params) => {
    const client = createAirtableClient(
      params.airtableConnection,
      context.debug.enabled,
    );

    const baseId = getBaseId(params.airtableConnection, params.baseId);
    const data = await paginateData<AirtableRecord>(
      client,
      `/v0/${baseId}/${params.tableName}`,
      "records",
      {
        view: params.view,
        fields: params.fields,
        filterByFormula: params.filterByFormula,
      },
      true,
    );

    return { data };
  },
  inputs: listRecordsInputs,
  examplePayload: listRecordsExamplePayload,
});
