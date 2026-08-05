import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listJobCancelReasonsExamplePayload } from "../../examplePayloads";
import { listJobCancelReasonsInputs } from "../../inputs";
import type { JobCancel } from "../../types";
import { fetchAllRecords } from "../../util";
export const listJobCancelReasons = action({
  display: {
    label: "List Job Cancel Reasons",
    description: "Retrieve a list of job cancel reasons",
  },
  inputs: listJobCancelReasonsInputs,
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
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
  examplePayload: listJobCancelReasonsExamplePayload,
});
