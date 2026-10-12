import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealFieldsV2Inputs } from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import { WebhookVersion } from "../../constants";
import { getDealFieldsV2ExamplePayload } from "../../examplePayloads";
import { getDealFieldsV2OutputSchema } from "../../outputSchemas";
export const getDealFieldsV2 = action({
  display: {
    label: "Get Deal Fields (V2)",
    description: "Gets all deal fields.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, pagination: { limit, cursor } = {}, fetchAll },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const data = await paginateRecordsWithCursor(
      client,
      "dealFields",
      {
        limit,
        cursor,
      },
      fetchAll,
    );
    return { data };
  },
  inputs: getDealFieldsV2Inputs,
  examplePayload: getDealFieldsV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealFieldsV2OutputSchema,
  }),
});
