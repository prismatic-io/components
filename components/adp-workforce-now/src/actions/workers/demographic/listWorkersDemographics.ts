import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listWorkerDemoGraphicsResponse } from "../../../examplePayloads";
import {
  $filter,
  $select,
  $skip,
  $top,
  connection,
  fetchAll,
  queryParams,
} from "../../../inputs";
import type { WorkerDemographics } from "../../../types";
import { fetchAllRecordsNoCount } from "../../../util";

export const listWorkersDemographics = action({
  display: {
    label: "List Worker Demographics",
    description:
      "Request the list of all available worker demographics that the requester is authorized to view.",
  },
  inputs: {
    fetchAll,
    $skip,
    $top,
    $filter,
    $select,
    queryParams,
    connection,
  },
  perform: async (
    context,
    { connection, fetchAll, $filter, queryParams, $select, $skip, $top },
  ) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data, confirmMessage, meta } =
      await fetchAllRecordsNoCount<WorkerDemographics>(
        axiosClient,
        "/hr/v2/worker-demographics",
        "workers",
        fetchAll,
        {
          $filter,
          $select,
          $skip,
          $top,
          ...queryParams,
        },
      );
    return {
      data: {
        workers: data,
        meta,
        confirmMessage,
      },
    };
  },
  examplePayload: {
    data: listWorkerDemoGraphicsResponse as unknown,
  },
});
