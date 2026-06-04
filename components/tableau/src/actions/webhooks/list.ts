import { getTableuClient } from "../../auth";
import { action } from "@prismatic-io/spectral";
import { apiVersion } from "../../inputs";
import { connectionInput, timeout, pageSize, pageNumber } from "../../inputs";
import { listWebhooksExamplePayload } from "../../examplePayloads";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Returns a list of all the webhooks on the specified site.",
  },
  examplePayload: listWebhooksExamplePayload,
  perform: async (context, { apiVersion, tableauConnection, timeout }) => {
    const client = await getTableuClient({
      tableauConnection,
      timeout,
      debug: context.debug.enabled,
      apiVersion,
    });
    const { data } = await client.get("/webhooks");

    return {
      data,
    };
  },
  inputs: {
    timeout,
    pageSize,
    pageNumber,
    tableauConnection: connectionInput,
    apiVersion,
  },
});
