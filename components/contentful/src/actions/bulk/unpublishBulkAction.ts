import { action } from "@prismatic-io/spectral";
import type {
  BulkAction,
  BulkActionUnpublishPayload,
  Environment,
} from "contentful-management";
import { createClient } from "../../client";
import { unpublishBulkActionExamplePayload } from "../../examplePayloads";
import { unpublishBulkActionInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const unpublishBulkAction = action({
  display: {
    label: "Unpublish Bulk Action",
    description: "Unpublishes a bulk action.",
  },
  perform: async (context, { connection, spaceId, environmentId, items }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const bulkActionInProgress: BulkAction<BulkActionUnpublishPayload> =
      await environment.createUnpublishBulkAction({
        entities: {
          sys: { type: "Array" },
          items: items as BulkActionUnpublishPayload["entities"]["items"],
        },
      });

    const bulkActionCompleted = await bulkActionInProgress.waitProcessing();

    return {
      data: bulkActionCompleted.toPlainObject() as unknown, 
    };
  },
  inputs: unpublishBulkActionInputs,
  examplePayload: { data: unpublishBulkActionExamplePayload },
});
