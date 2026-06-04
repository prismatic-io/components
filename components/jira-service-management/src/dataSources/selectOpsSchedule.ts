import { dataSource } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../client";
import { selectOpsScheduleExamplePayload } from "../examplePayloads";
import { selectOpsScheduleInputs } from "../inputs";
import type { OpsPagedResponse, OpsScheduleSummary } from "../types";
import { getOpsPaginatedData, toSortedPicklist } from "../util";

export const selectOpsSchedule = dataSource({
  display: {
    label: "Select Ops Schedule",
    description:
      "Fetches all JSM Ops on-call schedules and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectOpsScheduleInputs,
  perform: async (_context, { connection }) => {
    const { client } = await createOpsManagementClient(connection, false);
    const { data }: { data: OpsPagedResponse<OpsScheduleSummary> } =
      await getOpsPaginatedData<OpsScheduleSummary>(
        client,
        "/v1/schedules",
        true,
      );
    const result = toSortedPicklist(
      data.values,
      (s) => s.name,
      (s) => s.id,
    );
    return { result };
  },
  examplePayload: selectOpsScheduleExamplePayload,
});
