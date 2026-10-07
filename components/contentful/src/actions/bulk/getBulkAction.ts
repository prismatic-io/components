import { action, outputSchema } from "@prismatic-io/spectral";
import type { Environment } from "contentful-management";
import { createClient } from "../../client";
import { getBulkActionExamplePayload } from "../../examplePayloads";
import { getBulkActionInputs } from "../../inputs";
import { getBulkActionOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const getBulkAction = action({
  display: {
    label: "Get Bulk Action",
    description: "Retrieves a bulk action by ID.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { connection, spaceId, environmentId, bulkActionId },
  ) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const data = (
      await environment.getBulkAction(bulkActionId)
    ).toPlainObject();
    return {
      data: data as unknown,
    };
  },
  inputs: getBulkActionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBulkActionOutputSchema,
  }),
  examplePayload: getBulkActionExamplePayload,
});
