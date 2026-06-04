import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectWebhookInputs } from "../inputs";
import { paginateByPage } from "../util/pagination";

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select a webhook from the Smartsheet account.",
  },
  dataSourceType: "picklist",
  inputs: selectWebhookInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const webhooks = await paginateByPage<{ id: unknown; name: string }>(
      client,
      "/webhooks",
    );

    const result: Element[] = webhooks.map(({ name: label, id: key }) => ({
      label,
      key: util.types.toString(key),
    }));

    return { result };
  },
});
