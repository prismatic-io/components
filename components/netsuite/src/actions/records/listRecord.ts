import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listRecordInputs } from "../../inputs";
import { listRecordOutputSchema } from "../../outputSchemas";
export const listRecord = action({
  display: {
    label: "List Records",
    description: "List records of specified type.",
  },
  inputs: listRecordInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRecordOutputSchema,
  }),
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
        limit: params.pagination.limit,
        offset: params.pagination.offset,
      },
    });
    return { data: { data, headers: headers as Record<string, string> } };
  },
});
