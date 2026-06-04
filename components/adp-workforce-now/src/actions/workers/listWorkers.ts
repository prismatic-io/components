import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWorkersResponse } from "../../examplePayloads";
import {
  $count,
  $filter,
  $select,
  $skip,
  $top,
  connection,
  fetchAll,
  queryParams,
} from "../../inputs";
import type { Worker } from "../../types";
import { fetchAllRecords } from "../../util";

export const listWorkers = action({
  display: {
    label: "List Workers",
    description:
      "Retrieves all available workers that the requester is authorized to view.",
  },
  inputs: {
    fetchAll,
    $skip,
    $top,
    $count,
    $filter,
    $select,
    queryParams,
    connection,
  },
  perform: async (
    context,
    {
      connection,
      $count,
      fetchAll,
      $filter,
      queryParams,
      $select,
      $skip,
      $top,
    },
  ) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data, confirmMessage, meta } = await fetchAllRecords<Worker>(
      axiosClient,
      "/hr/v2/workers",
      "workers",
      fetchAll,
      {
        count: $count,
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
    data: listWorkersResponse,
  },
});
