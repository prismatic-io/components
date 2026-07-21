import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { selectWebhookInputs } from "../inputs";
import { getTableauClient } from "../util";
export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "A picklist of webhooks in your Tableau site.",
  },
  inputs: selectWebhookInputs,
  perform: async (_context, { tableauConnection, apiVersion }) => {
    const client = await getTableauClient({
      tableauConnection,
      timeout: 10000,
      debug: false,
      apiVersion: util.types.toString(apiVersion) || undefined,
    });
    const { data } = await client.get("/webhooks");
    const webhooks = data?.webhooks?.webhook ?? [];
    const result: Element[] = (
      webhooks as {
        name: string;
        id: string;
      }[]
    )
      .map((webhook) => ({
        label: webhook.name,
        key: webhook.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "My Webhook",
        key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    ],
  },
});
