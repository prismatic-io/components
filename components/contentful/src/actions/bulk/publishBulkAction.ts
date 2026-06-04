import { action } from "@prismatic-io/spectral";
import type {
  BulkAction,
  BulkActionPublishPayload,
  Environment,
} from "contentful-management";
import { createClient } from "../../client";
import { publishBulkActionExamplePayload } from "../../examplePayloads";
import { publishBulkActionInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const publishBulkAction = action({
  display: {
    label: "Publish Bulk Action",
    description: "Publishes a bulk action.",
  },
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
  inputs: publishBulkActionInputs,
  examplePayload: { data: publishBulkActionExamplePayload },
});
