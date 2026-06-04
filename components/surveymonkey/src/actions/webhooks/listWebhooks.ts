import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { paginateResults } from "../../util";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import type { Webhook } from "../../types";






export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all webhooks in your account.",
  },
  inputs: listWebhooksInputs,
  perform: async (context, { connection, fetchAll, page, perPage }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await paginateResults<Webhook>(client, "/webhooks", fetchAll, {
      page,
      per_page: perPage,
    });

    return { data };
  },
  examplePayload: listWebhooksExamplePayload,
});
