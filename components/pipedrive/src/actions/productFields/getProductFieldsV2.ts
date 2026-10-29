import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductFieldsV2Inputs } from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import { WebhookVersion } from "../../constants";
import { getProductFieldsV2ExamplePayload } from "../../examplePayloads";
import { getProductFieldsV2OutputSchema } from "../../outputSchemas";

export const getProductFieldsV2 = action({
  display: {
    label: "Get Product Fields (V2)",
    description: "Gets all product fields.",
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
      "productFields",
      {
        limit,
        cursor,
      },
      fetchAll,
    );
    return { data };
  },
  inputs: getProductFieldsV2Inputs,
  examplePayload: getProductFieldsV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductFieldsV2OutputSchema,
  }),
});
