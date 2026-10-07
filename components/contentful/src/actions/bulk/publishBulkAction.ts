import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  BulkAction,
  BulkActionPublishPayload,
  Environment,
} from "contentful-management";
import { createClient } from "../../client";
import { publishBulkActionExamplePayload } from "../../examplePayloads";
import { publishBulkActionInputs } from "../../inputs";
import { publishBulkActionOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const publishBulkAction = action({
  display: {
    label: "Publish Bulk Action",
    description: "Publishes a bulk action.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId, environmentId, items }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const bulkActionInProgress: BulkAction<BulkActionPublishPayload> =
      await environment.createPublishBulkAction({
        entities: {
          sys: { type: "Array" },
          items: items as BulkActionPublishPayload["entities"]["items"],
        },
      });
    const bulkActionCompleted = await bulkActionInProgress.waitProcessing();
    return {
      data: bulkActionCompleted.toPlainObject() as unknown,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => publishBulkActionExamplePayload,
  inputs: publishBulkActionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: publishBulkActionOutputSchema,
  }),
  examplePayload: publishBulkActionExamplePayload,
});
