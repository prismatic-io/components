import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listWorkersDemographicsExamplePayload } from "../../../examplePayloads";
import { listWorkersDemographicsInputs } from "../../../inputs";
import type { WorkerDemographics } from "../../../types";
import { fetchAllRecordsNoCount } from "../../../util";
export const listWorkersDemographics = action({
  display: {
    label: "List Worker Demographics",
    description:
      "Request the list of all available worker demographics that the requester is authorized to view.",
  },
  inputs: listWorkersDemographicsInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, $filter, queryParams, $select, pagination },
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
  }> => listWorkersDemographicsExamplePayload,
  examplePayload: listWorkersDemographicsExamplePayload,
});
