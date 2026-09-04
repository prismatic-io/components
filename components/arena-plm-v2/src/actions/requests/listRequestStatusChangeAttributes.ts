import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestStatusChangeAttributesExamplePayload } from "../../examplePayloads";
import { listRequestStatusChangeAttributesInputs } from "../../inputs";
import { attributeDefinitionFullRepListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestStatusChangeAttributes = action({
  display: {
    label: "List Request Status Change Attributes",
    description:
      "List attributes triggered by request status changes. These attributes can be utilized in the POST requests/statuschanges endpoints.",
  },
  inputs: listRequestStatusChangeAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeDefinitionFullRepListSchema,
  }),
  examplePayload: listRequestStatusChangeAttributesExamplePayload,
  perform: async (context, { connection }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        "Fetching request status change attributes from Arena",
      );
      const { data } = await client.get(
        "/settings/requests/statuschangeattributes",
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} request status change attributes`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "List Request Status Change Attributes",
      );
    }
  },
});
