import { dataSource, type Element } from "@prismatic-io/spectral";
import { getMondayClient } from "../client";
import { selectWebhookInputs } from "../inputs";
import ListBoardWebhooksQuery from "../queries/listBoardWebhooks.gql";
import type { ListWebhooksResponse } from "../types";

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select a webhook from the board's webhook subscriptions.",
  },
  inputs: selectWebhookInputs,
  perform: async (_context, { connection, boardId }) => {
    const client = getMondayClient(connection, false);

    const data = await client.request<ListWebhooksResponse>(
      ListBoardWebhooksQuery,
      { board_id: boardId },
    );

    const webhooks = data.webhooks ?? [];

    const result = webhooks.map<Element>((webhook) => ({
      label: `${webhook.id} - ${webhook.event}`,
      key: webhook.id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});
