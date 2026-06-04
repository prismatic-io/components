import { action } from "@prismatic-io/spectral";
import { connectionInput } from "../../inputs";
import { createClient } from "../../client";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description:
      "List all webhooks configured, including those for other integrations",
  },
  inputs: {
    connectionInput,
  },
  perform: async (context, { connectionInput }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get("/webhook");
    return { data };
  },
  examplePayload: {
    data: {
      isLast: true,
      maxResults: 100,
      startAt: 0,
      total: 1,
      values: [
        {
          events: ["attachment_archived"],
          expirationDate: "2022-12-18T15:22:13.418-0900",
          id: 1,
          jqlFilter: "project = EXAMPLE",
        },
      ],
    },
  },
});
