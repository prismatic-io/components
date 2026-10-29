import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { listJobsResponse } from "../../examplePayloads";
import { connection, extraParams, limit, page } from "../../inputs";

export const listJobs = action({
  display: {
    label: "List Jobs",
    description: "Retrieve all jobs",
  },
  inputs: { page, limit, extraParams, connection },
  perform: async (context, { connection, limit, page, extraParams }) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data, headers } = await client.get("/jobs", {
      params: {
        page,
        limit,
        ...extraParams,
      },
    });
    return { data, headers: headers as Record<string, string> };
  },
  examplePayload: {
    data: listJobsResponse,
    headers: {},
  },
});
