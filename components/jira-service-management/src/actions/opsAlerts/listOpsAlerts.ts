import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { listOpsAlertsExamplePayload } from "../../examplePayloads";
import { listOpsAlertsInputs } from "../../inputs";
import type { OpsAlertSummary } from "../../types";
import { getOpsPaginatedData } from "../../util";

export const listOpsAlerts = action({
  display: {
    label: "List Ops Alerts",
    description: "Returns alerts in JSM Ops, optionally filtered by query.",
  },
  inputs: listOpsAlertsInputs,
  perform: async (
    context,
    {
      connection,
      opsAlertQuery,
      opsAlertSort,
      opsAlertOrder,
      fetchAll,
      opsAlertOffset,
      opsAlertSize,
      additionalQueryParams,
    },
  ) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await getOpsPaginatedData<OpsAlertSummary>(
      client,
      "/v1/alerts",
      fetchAll,
      {
        params: {
          ...additionalQueryParams,
          offset: opsAlertOffset,
          size: opsAlertSize,
          query: opsAlertQuery,
          sort: opsAlertSort,
          order: opsAlertOrder,
        },
      },
    );
    return { data };
  },
  examplePayload: listOpsAlertsExamplePayload,
});
