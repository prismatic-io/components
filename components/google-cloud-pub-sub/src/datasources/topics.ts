import { dataSource, util } from "@prismatic-io/spectral";
import type { pubsub_v1 } from "googleapis";
import { createClient } from "../client";
import { connectionInput, pageSize, pageToken, projectId } from "../inputs";
import { paginateAll, sortByName } from "../util";

export const topics = dataSource({
  display: {
    label: "Fetch Topics",
    description: "Fetch an array of topics",
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
      (params) => client.projects.topics.list(params),
      {
        project: `projects/${projectId}`,
        pageToken,
        pageSize,
      },
      "topics",
      true,
    )) as pubsub_v1.Schema$ListTopicsResponse;
    if (data.topics) {
      const result = data.topics
        .sort(sortByName)
        .map<string>((topics) => util.types.toString(topics.name));
      return { result };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "projects/{project}/topics/{topic}.",
        key: "projects/{project}/topics/{topic}.",
      },
    ],
  },
});
