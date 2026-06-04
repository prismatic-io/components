import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectWebhookScopeColumnInputs } from "../inputs";

export const selectWebhookScopeColumn = dataSource({
  display: {
    label: "Select Webhook Scope Column",
    description: "Select columns from the sheet used as the webhook scope.",
  },
  dataSourceType: "picklist",
  inputs: selectWebhookScopeColumnInputs,
  perform: async (_context, { connection, scopeObjectId }) => {
    const client = createClient(connection, false);
    const {
      data: { data: columns },
    } = await client.get(`/sheets/${scopeObjectId}/columns`);

    if (!columns || !Array.isArray(columns)) {
      return { result: [] };
    }

    const result: Element[] = columns.map(({ title: label, id: key }) => ({
      label,
      key: util.types.toString(key),
    }));

    return { result };
  },
});
