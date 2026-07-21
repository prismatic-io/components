import { action } from "@prismatic-io/spectral";
import type { pubsub_v1 } from "googleapis";
import { createClient } from "../../client";
import { listTopicsInputs } from "../../inputs";
import { paginateAll } from "../../util";
export const listTopics = action({
  display: {
    label: "List Topics",
    description: "Lists matching topics.",
  },
  inputs: listTopicsInputs,
  perform: async (
    _context,
    { connectionInput, projectId, pagination = {}, fetchAll },
  ) => {
    const client = createClient(connectionInput);
    const data = (await paginateAll(
      (params) => client.projects.topics.list(params),
      {
        project: `projects/${projectId}`,
        pageToken: pagination.pageToken,
        pageSize: pagination.pageSize,
      },
      "topics",
      fetchAll,
    )) as pubsub_v1.Schema$ListTopicsResponse;
    return {
      data,
    };
  },
});
