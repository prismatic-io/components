import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listJobsExamplePayload } from "../../examplePayloads";
import { listJobsInputs } from "../../inputs";
import type { Job } from "../../types";
import { fetchAllRecords } from "../../util";
export const listJobs = action({
  display: {
    label: "List Jobs",
    description: "Retrieve a list of jobs",
  },
  inputs: listJobsInputs,
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    if (fetchAll) {
      const data = await fetchAllRecords<Job>(client, "/jobs", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/jobs`, {
      params: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listJobsExamplePayload,
});
