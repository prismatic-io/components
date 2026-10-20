import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWorkersExamplePayload } from "../../examplePayloads";
import { listWorkersInputs } from "../../inputs";
import type { Worker } from "../../types";
import { fetchAllRecords } from "../../util";
export const listWorkers = action({
  display: {
    label: "List Workers",
    description:
      "Retrieves all available workers that the requester is authorized to view.",
  },
  inputs: listWorkersInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, $count, fetchAll, $filter, queryParams, $select, pagination },
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
        $skip: pagination.$skip,
        $top: pagination.$top,
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listWorkersExamplePayload,
  examplePayload: listWorkersExamplePayload,
});
