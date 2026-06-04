import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { createOpsAlertExamplePayload } from "../../examplePayloads";
import { createOpsAlertInputs } from "../../inputs";

export const createOpsAlert = action({
  display: {
    label: "Create Ops Alert",
    description:
      "Creates a new alert in JSM Ops. Returns an asynchronous request ID; use Get Ops Alert to fetch the resulting alert once processed.",
  },
  inputs: createOpsAlertInputs,
  perform: async (
    context,
    {
      connection,
      opsAlertMessage,
      opsAlertDescription,
      opsAlertPriority,
      opsAlertAlias,
      opsAlertTags,
      additionalFields,
    },
  ) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const body = {
      ...additionalFields,
      message: opsAlertMessage,
      description: opsAlertDescription,
      priority: opsAlertPriority,
      alias: opsAlertAlias,
      tags: opsAlertTags,
    };
    const { data } = await client.post("/v1/alerts", body);
    return { data };
  },
  examplePayload: createOpsAlertExamplePayload,
});
