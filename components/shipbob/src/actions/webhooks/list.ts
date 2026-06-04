import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  Limit,
  Page,
  Topic,
  version,
} from "../../inputs";
import { generatePayload } from "../util";
import { getAllPaginatedData } from "../../util";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Get a list of active Webhooks",
  },
  perform: async (
    context,
    { connectionInput, version, fetchAll: doFetchAll, ...inputs },
  ) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const params = generatePayload(inputs);

    if (doFetchAll) {
      const data = await getAllPaginatedData(client, "/webhook", params);
      return { data };
    }

    const { data } = await client.get(`/webhook`, {
      params,
    });
    return { data };
  },
  inputs: {
    connectionInput,
    version,
    fetchAll,
    Topic,
    Page: { ...Page, comments: "Page of Webhooks to get" },
    Limit: { ...Limit, comments: "Amount of Webhooks per page to request" },
  },
  examplePayload: listWebhooksExamplePayload,
});
