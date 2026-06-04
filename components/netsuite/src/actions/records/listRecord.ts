import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listRecordInputs } from "../../inputs";

export const listRecord = action({
  display: {
    label: "List Records",
    description: "List records of specified type",
  },
  inputs: listRecordInputs,
  examplePayload: listCustomersExamplePayload,
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      "record",
      context.debug.enabled,
    );
    const { data, headers } = await client.get(`/${params.recordType}`, {
      params: {
        q: params.query,
        limit: params.limit,
        offset: params.offset,
      },
    });
    return { data: { data, headers: headers as Record<string, string> } };
  },
});
