import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { listOpsSchedulesExamplePayload } from "../../examplePayloads";
import { listOpsSchedulesInputs } from "../../inputs";
import type { OpsScheduleSummary } from "../../types";
import { getOpsPaginatedData } from "../../util";

export const listOpsSchedules = action({
  display: {
    label: "List Ops Schedules",
    description: "Returns all on-call schedules configured in JSM Ops.",
  },
  inputs: listOpsSchedulesInputs,
  perform: async (
    context,
    {
      connection,
      fetchAll,
      scheduleQuery,
      scheduleOffset,
      scheduleSize,
      additionalQueryParams,
    },
  ) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await getOpsPaginatedData<OpsScheduleSummary>(
      client,
      "/v1/schedules",
      fetchAll,
      {
        params: {
          ...additionalQueryParams,
          query: scheduleQuery,
          offset: scheduleOffset,
          size: scheduleSize,
        },
      },
    );
    return { data };
  },
  examplePayload: listOpsSchedulesExamplePayload,
});
