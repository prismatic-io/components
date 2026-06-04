import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listJobsResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { Job } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listJobs = action({
  display: {
    label: "List Jobs",
    description: "Retrieve a list of jobs",
  },
  inputs: {
    connection,
    fetchAll,
    page,
    pageSize,
    includeTotal,
    sort,
    customQueryParams,
  },
  perform: async (
    context,
    {
      connection,
      page,
      pageSize,
      includeTotal,
      sort,
      customQueryParams,
      fetchAll,
    },
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
        page,
        pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listJobsResponse,
  },
});
