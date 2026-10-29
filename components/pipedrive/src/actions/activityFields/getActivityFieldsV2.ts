import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getActivityFieldsV2Inputs } from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import { WebhookVersion } from "../../constants";
import { getActivityFieldsV2ExamplePayload } from "../../examplePayloads";
import { getActivityFieldsV2OutputSchema } from "../../outputSchemas";

export const getActivityFieldsV2 = action({
  display: {
    label: "Get Activity Fields (V2)",
    description: "Gets all activity fields.",
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
      "activityFields",
      {
        limit,
        cursor,
      },
      fetchAll,
    );
    return { data };
  },
  inputs: getActivityFieldsV2Inputs,
  examplePayload: getActivityFieldsV2ExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getActivityFieldsV2OutputSchema,
  }),
});
