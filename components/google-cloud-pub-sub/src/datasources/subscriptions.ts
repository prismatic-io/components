import { dataSource, type Element, util } from "@prismatic-io/spectral";
import type { pubsub_v1 } from "googleapis";
import { createClient } from "../client";
import { connectionInput, pageSize, pageToken, projectId } from "../inputs";
import { paginateAll, sortByName } from "../util";

export const subscriptions = dataSource({
  display: {
    label: "Fetch subscriptions",
    description: "Fetch an array of subscriptions",
  },
  inputs: {
    connection: connectionInput,
    projectId,
    pageSize,
    pageToken,
  },
  perform: async (_context, { connection, projectId, pageSize, pageToken }) => {
    const client = createClient(connection);
    const data = (await paginateAll(
      (params) => client.projects.subscriptions.list(params),
      {
        project: `projects/${projectId}`,
        pageSize,
        pageToken,
      },
      "subscriptions",
      true,
    )) as pubsub_v1.Schema$ListSubscriptionsResponse;
    if (data.subscriptions) {
      const result = data.subscriptions.sort(sortByName).map<Element>((subscriptions) => ({
        label: `${subscriptions.name} / ${subscriptions.topic}`,
        key: util.types.toString(subscriptions.name),
      }));
      return { result };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label:
          "projects/{project}/subscriptions/{subscription} / projects/{project}/topics/{topic}",
        key: "projects/{project}/subscriptions/{subscription}",
      },
    ],
  },
});
