import { action } from "@prismatic-io/spectral";
import type { pubsub_v1 } from "googleapis";
import { createClient } from "../../client";
import { listSubscriptionsInputs } from "../../inputs";
import { paginateAll } from "../../util";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "Lists matching Subscriptions.",
  },
  inputs: listSubscriptionsInputs,
  perform: async (_context, { connectionInput, projectId, pageToken, pageSize, fetchAll }) => {
    const client = createClient(connectionInput);
    const data = (await paginateAll(
      (params) => client.projects.subscriptions.list(params),
      {
        project: `projects/${projectId}`,
        pageSize,
        pageToken,
      },
      "subscriptions",
      fetchAll,
    )) as pubsub_v1.Schema$ListSubscriptionsResponse;
    return {
      data,
    };
  },
});
