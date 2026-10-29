import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonFieldsV2Inputs } from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import { WebhookVersion } from "../../constants";
import { getPersonFieldsV2ExamplePayload } from "../../examplePayloads";
import { getPersonFieldsV2OutputSchema } from "../../outputSchemas";

export const getPersonFieldsV2 = action({
  display: {
    label: "Get Person Fields (V2)",
    description: "Gets all person fields.",
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
      "personFields",
      {
        limit,
        cursor,
      },
      fetchAll,
    );
    return { data };
  },
  inputs: getPersonFieldsV2Inputs,
  examplePayload: getPersonFieldsV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonFieldsV2OutputSchema,
  }),
});
