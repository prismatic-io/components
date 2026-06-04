import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listTriggersPayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";
import { fetchTriggers } from "./utils";

export const listTriggers = action({
  display: {
    label: "List Triggers",
    description: "List all workflow triggers configured in Zendesk.",
  },
  inputs: { connection: connectionInput },
  perform: async (context, params) => {
    const client = rawHttpClient(params.connection);
    const triggers = await fetchTriggers(client);
    return { data: triggers };
  },
  examplePayload: {
    data: listTriggersPayload as unknown,
  },
});
