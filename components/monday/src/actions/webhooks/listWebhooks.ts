import { action } from "@prismatic-io/spectral";
import { getMondayClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import ListBoardWebhooksQuery from "../../queries/listBoardWebhooks.gql";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Lists all webhook subscriptions for a board.",
  },
  inputs: listWebhooksInputs,
  perform: async (context, params) => {
    const client = getMondayClient(params.connection, context.debug.enabled);
    const variables = { board_id: params.boardId };
    try {
      context.logger.info(`Listing webhooks for board ${params.boardId}.`);
      const data = await client.request(ListBoardWebhooksQuery, variables);
      context.logger.info(
        `Successfully listed webhooks for board ${params.boardId}.`,
      );
      return { data };
    } catch (error) {
      context.logger.error(
        `Failed to list webhooks for board ${params.boardId}: ${error}`,
      );
      throw error;
    }
  },
  examplePayload: listWebhooksExamplePayload,
});
