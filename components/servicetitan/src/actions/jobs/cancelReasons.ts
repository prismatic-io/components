import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listJobCancelReasonsResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { JobCancel } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listJobCancelReasons = action({
  display: {
    label: "List Job Cancel Reasons",
    description: "Retrieve a list of job cancel reasons",
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
      const data = await fetchAllRecords<JobCancel>(
        client,
        "/job-cancel-reasons",
        {
          includeTotal,
          sort,
          ...customQueryParams,
        },
      );
      return {
        data,
      };
    }
    const { data } = await client.get(`/job-cancel-reasons`, {
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
    data: listJobCancelReasonsResponse,
  },
});
